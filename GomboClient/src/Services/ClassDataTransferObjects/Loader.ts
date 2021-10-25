import path from "path";
import {DataTransferObject} from "./DataTransferObject";
import type {DtoLoaded, Mappings} from "./Types";


export class Loader {

	/**
	 * All data transfer objects that have been loaded by {@see loadDataTransferObjects}
	 * @type {DtoLoaded[]}
	 */
	public static dataTransferObjects: DtoLoaded[] = [];

	/**
	 * All data transfer object mappings that have been auto loaded.
	 * @type {Mappings[]}
	 */
	public static mappings: Mappings = [];

	/**
	 * Check if a module is a data transfer object
	 *
	 * @param {NodeModule} module
	 * @param {string} exportName
	 * @returns {boolean}
	 * @private
	 */
	private static isDtoModule(module: NodeModule, exportName: string) {
		const isFunction = module.exports[exportName] instanceof Function;

		if (!isFunction) {
			return false;
		}

		const classInst = module?.exports[exportName];

		return classInst?.prototype?.constructor?.__proto__.name === DataTransferObject.name;
	}

	/**
	 * Get the name of a module
	 *
	 * @param {NodeModule} module
	 * @param {string} exportName
	 * @returns {any}
	 * @private
	 */
	private static dtoModuleName(module: NodeModule, exportName: string) {
		const isFunction = module.exports[exportName] instanceof Function;

		if (!isFunction) {
			return false;
		}

		const classInst = module?.exports[exportName];

		return classInst?.name;
	}

	/**
	 * Format a require module into a usable format
	 *
	 * @param {NodeModule} module
	 * @returns {{importPath: string, path: string, name: string, nameWithoutExtension: string}}
	 * @private
	 */
	private static formatModule(module: NodeModule) {
		const fileInfo = path.parse(module.filename);
		const fileName = `${fileInfo.name}${fileInfo.ext}`;
		let importPath = path.relative(path.resolve(__dirname), path.resolve(module.filename));

		if (fileName === importPath) {
			importPath = './' + importPath;
		}

		return {
			name                 : fileName,
			nameWithoutExtension : fileInfo.name,
			path                 : module.filename.replace(require.main.path, ''),
			importPath           : importPath
		};
	}

	/**
	 * Pick out all data transfer objects from the require cache list
	 *
	 * @param {NodeModule[]} moduleList
	 * @param {boolean} isChild
	 * @returns {DtoLoaded[] | {moduleInfo: {}, modules: {}}}
	 * @private
	 */
	private static findDtoModules(moduleList: NodeModule[], isChild = false) {
		const modules    = {};
		const moduleInfo = {};

		moduleList
			.filter(mod => !mod.filename.includes('node_modules'))
			.filter(mod => mod.children.some(
				c => c.filename.includes('class-data-transfer-objects') &&
					c.filename.includes('DataTransferObject')
			))
			.forEach(mod => {

				if (mod.children.length) {
					const childDtos: { moduleInfo: {}; modules: {} } | any[] = this.findDtoModules(mod.children, true);

					if (!Array.isArray(childDtos)) {
						if (childDtos?.modules) {
							for (let modulesKey in childDtos.modules) {
								if (!modules[modulesKey]) {
									modules[modulesKey] = childDtos.modules[modulesKey];
								}
							}
						}

						if (childDtos.moduleInfo) {
							for (let modulesKey in childDtos.moduleInfo) {
								if (!modules[modulesKey]) {
									moduleInfo[modulesKey] = childDtos.moduleInfo[modulesKey];
								}
							}
						}
					}

				}

				Object.keys(mod.exports)
					.filter(exp => this.isDtoModule(mod, exp))
					.forEach(exp => {
						const expMod = mod.exports[exp];
						const name   = this.dtoModuleName(mod, exp);

						if (!modules[name]) {
							modules[name] = expMod;
						}
					});


				const formatted = this.formatModule(mod);
				if (!moduleInfo[formatted.nameWithoutExtension]) {
					moduleInfo[formatted.nameWithoutExtension] = formatted;
				}
			});

		if (isChild) {
			return {modules, moduleInfo};
		}

		return Object.keys(modules)
			.filter(moduleName => moduleInfo[moduleName])
			.map(moduleName => {
				return {
					module : modules[moduleName],
					...moduleInfo[moduleName]
				};
			}) as DtoLoaded[];
		//		return modules.filter(m => m.dtoExports.length !== 0);
	}

	/**
	 * We'll use the require path to iterate through all defined modules
	 * and try to pick out all used data transfer objects so we can automatically load them
	 *
	 * @returns {{dataTransferObjects: DtoLoaded[], mappings: Mappings}}
	 */
	public static findDataTransferObjects(): { dataTransferObjects: DtoLoaded[], mappings: Mappings } {
		const mainPath = process.cwd();

		let dataTransferObjects = [];
		let mappings            = {};

		dataTransferObjects = this.findDtoModules(Object.values(require.cache)) as DtoLoaded[];

		dataTransferObjects.forEach(dto => {
			const dtoImport = require(dto.importPath);
			for (let key of Object.keys(dtoImport)) {
				const dtoName = key;
				const dto     = dtoImport[key];

				if (mappings[key]) {
					continue;
				}

				mappings[key] = dto;
			}
		});

		return {dataTransferObjects, mappings};
	}

	public static loadDataTransferObjects() {
		this.dataTransferObjects = [];
		this.mappings            = [];

		const {dataTransferObjects, mappings} = this.findDataTransferObjects();

		this.mappings            = mappings;
		this.dataTransferObjects = dataTransferObjects;
	}
}
