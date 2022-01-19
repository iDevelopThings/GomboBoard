<div class="py-6">
    <form on:submit|preventDefault={createBoard} class="flex flex-col space-y-4">

        <FormGroup {errors} name="title">
            <label for="title">Title</label>
            <input id="title" type="text" bind:value={title} {disabled} placeholder="A title for your board"/>
        </FormGroup>

        <div class="flex flex-row justify-end">
            <button class="primary" {disabled}>
                Create Board
            </button>
        </div>
    </form>
</div>


<script lang="ts">
	import {goto} from "$app/navigation";
	import FormGroup from '../../Components/FormGroup.svelte';
	import {BoardApi} from "../../Modules/Boards/Api/BoardApi";
	import {boards} from "../../Modules/Boards/BoardState";
	import {BoardModel} from "../../Modules/Boards/Model/BoardModel";
//	import {ValidationErrors} from "../../Services/ClassDataTransferObjects/ValidationErrors";

	let title                             = '';
	let disabled: boolean                 = false;
	let errors: { [key: string]: string } = {};

	async function createBoard() {
		errors   = {};
		disabled = true;

		try {
			const board = await BoardApi.create(
				BoardModel.create({title})
			);

			$boards = [...$boards, board];

			goto(`/boards/${board._id}`);
		} catch (error) {
//			if (error instanceof ValidationErrors) {
//				errors = error.validationErrorsFormatted;
//			}
		}

		disabled = false;
	}

</script>

<script context="module">
	import {Auth} from '../../Services/Auth';

	export async function load({session})
	{
		if (!Auth.checkIfAuthed(session)) {
			return {redirect : '/auth/login', status : 302};
		}

		return {};
	}
</script>
