<div class="py-8 flex flex-col justify-center items-center">

    <form on:submit|preventDefault={submit} class="space-y-6 bg-white rounded shadow p-6 max-w-md w-full">

        <FormGroup name="email" {errors}>
            <label for="email">Email</label>
            <input id="email" bind:value={user.email} {disabled} type="email" placeholder="Your email address"/>
        </FormGroup>

        <FormGroup name="password" {errors}>
            <label for="password">Password</label>
            <input id="password" bind:value={user.password} {disabled} type="password" placeholder="Your password"/>
        </FormGroup>

        <div class="flex flex-row justify-end">
            <button type="submit" class="primary" {disabled}>
                Login
            </button>
        </div>
    </form>

</div>

<script lang="ts">
	import FormGroup from '../../Components/FormGroup.svelte';
	import {TempUserModel} from "../../Modules/User/Model/TempUserModel";
	import {Http} from "../../Services/Api/Http";
	import {ValidationErrors} from "../../Services/ClassDataTransferObjects/ValidationErrors";

	const user: TempUserModel = TempUserModel.create({
		//		email    : '',
		//		password : '',
		email    : 'sam@idt.dev',
		password : 'secret'
	}, false);

	let errors: { [key: string]: string } = {};
	let disabled                          = false;

	const submit = async () => {
		errors = {};

		if (disabled) {
			return;
		}

		disabled = true;

		try {
			user.validate(['login']);

			const response = await Http.post('http://localhost:5000/auth/login', user);

			window.location = '/dashboard';

		} catch (error) {
			if (error instanceof ValidationErrors) {
				errors = error.validationErrorsFormatted;
				return;
			}
			if (error?.response?.status === 422) {
				errors = error?.response?.data?.data;
				return;
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
