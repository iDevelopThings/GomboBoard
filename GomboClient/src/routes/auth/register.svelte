<div class="py-8 flex flex-col justify-center items-center">

    <form on:submit|preventDefault={submit} class="space-y-6 bg-white rounded shadow p-6 max-w-md w-full">
        <FormGroup name="name" {errors}>
            <label for="name">Name</label>
            <input id="name" type="text" bind:value={user.name} placeholder="Your name"/>
        </FormGroup>

        <FormGroup name="email" {errors}>
            <label for="email">Email</label>
            <input id="email" type="email" bind:value={user.email} placeholder="Your email address" {disabled}/>
        </FormGroup>

        <FormGroup name="password" {errors}>
            <label for="password">Password</label>
            <input id="password" type="password" bind:value={user.password} {disabled} placeholder="Your password"/>
        </FormGroup>

        <div class="flex flex-row justify-end">
            <button type="submit" class="primary" {disabled}>
                Register
            </button>
        </div>
    </form>

</div>

<script lang="ts">
	import FormGroup from '../../Components/FormGroup.svelte';
	import {TempUserModel} from "../../Modules/User/Model/TempUserModel";
	import {Http} from "../../Services/Api/Http";
//	import {ValidationErrors} from "../../Services/ClassDataTransferObjects/ValidationErrors";

	const user: TempUserModel = TempUserModel.create({
		// email    : 'sam@idt.dev',
		email : '',
		// password : 'secret',
		password : '',
		// name     : 'Sammeh',
		name : '',
	}, false);

	let errors: { [key: string]: string } = {};
    let disabled = false;

	const submit = async () => {
		errors = {};

		if(disabled) {
			return;
        }

		disabled = true;

		try {
			user.validate(['register']);

			const response = await Http.post('http://localhost:5000/auth/register', user);

			window.location = '/dashboard';
		} catch (error) {
//			if (error instanceof ValidationErrors) {
//				errors = error.validationErrorsFormatted;
//				return;
//			}
			if (error?.response?.status === 422) {
				errors = error?.response?.data?.data;
			}
		} finally {
            disabled = false;
		}

	};
</script>

<script context="module">
	import {Auth} from '../../Services/Auth';

	export async function load({session})
	{
		if (Auth.checkIfAuthed(session)) {
			return {redirect : '/dashboard', status : 302};
		}

		return {};
	}
</script>
