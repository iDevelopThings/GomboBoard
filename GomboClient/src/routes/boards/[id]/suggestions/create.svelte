<div class="py-6">
    <form on:submit|preventDefault={create} class="flex flex-col space-y-4">

        <FormGroup {errors} name="title">
            <label for="title">Title</label>
            <input id="title" type="text" bind:value={suggestion.title} {disabled} placeholder="What do you want to suggest?"/>
        </FormGroup>

        <FormGroup {errors} name="title">
            <label for="content">Title</label>
            <textarea id="content" type="text" bind:value={suggestion.content} {disabled} placeholder="Give some information about your suggestion"></textarea>
        </FormGroup>

        <div class="flex flex-row justify-end">
            <button class="primary" {disabled}>
                Submit Suggestion
            </button>
        </div>
    </form>
</div>

<script lang="ts">

	import {goto} from "$app/navigation";
	import {page} from "$app/stores";
	import FormGroup from '../../../../Components/FormGroup.svelte';
	import {SuggestionsApi} from "../../../../Modules/Suggestions/Api/SuggestionsApi";
	import {SuggestionModel} from "../../../../Modules/Suggestions/Model/SuggestionModel";
	import {suggestions} from "../../../../Modules/Suggestions/SuggestionsState";

	let suggestion: SuggestionModel = SuggestionModel.create({
		boardId : $page.params.id
	}, false);

	let disabled: boolean                 = false;
	let errors: { [key: string]: string } = {};

	async function create() {
		errors   = {};
		disabled = true;

		try {
			suggestion.validate();

			const response = await SuggestionsApi.create(suggestion);

			$suggestions = [suggestion, ...$suggestions];

			goto(`/boards/${suggestion.boardId}`);

		} catch (error) {
//			if (error instanceof ValidationErrors) {
//				errors = error.validationErrorsFormatted;
//			}
		}

		disabled = false;
	}

</script>

<script context="module">
	import {Auth} from '../../../../Services/Auth';

	export async function load({session})
	{

		if (!Auth.checkIfAuthed(session)) {
			return {redirect : '/auth/login', status : 302};
		}

		return {};
	}
</script>
