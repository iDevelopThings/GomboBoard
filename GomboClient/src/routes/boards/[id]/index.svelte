{#if ($currentBoard === null && $isLoadingCurrentBoard)}
    <div>
        Loading Page
    </div>
{:else }
    <div class="py-6 flex flex-col space-y-6">

        <div class="rounded shadow bg-gray-400 overflow-hidden">
            <div class="h-64 flex flex-col justify-center items-center bg-gray-500">
                <h1 class="text-3xl uppercase text-white font-semibold tracking-wide">
                    {$currentBoard.title}
                </h1>
            </div>

            <div class="flex flex-row items-center justify-end  rounded shadow p-4">
                <a href={`/boards/${$currentBoard._id}/suggestions/create`} class="button">
                    Add a suggestion
                </a>
            </div>
        </div>

        {#each $suggestions as suggestion}
            <Suggestion {suggestion}/>
        {/each}

    </div>
{/if}


<script lang="ts">
	import {page} from "$app/stores";
	import {onMount} from "svelte";
	import {currentBoard, isLoadingCurrentBoard, loadBoard} from "../../../Modules/Boards/BoardState";
	import {loadSuggestions, suggestions} from "../../../Modules/Suggestions/SuggestionsState";
	import Suggestion from '../../../Modules/Suggestions/Views/Suggestion.svelte';

	onMount(async () => {
		await loadBoard($page.params.id);
		await loadSuggestions($page.params.id);
	});
</script>
