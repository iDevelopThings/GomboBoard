<script>
	import {onMount}                            from "svelte";
	import {getBoards, isLoadingBoards, boards} from "../BoardState";
	import Board                                from './Board.svelte';

	onMount(async () => {
		await getBoards();
	});
</script>

<div class="py-6">

    <h1 class="text-lg font-semibold mb-3">
        Your boards
    </h1>

    <div class="flex flex-col space-y-3">

        {#if ($isLoadingBoards === true)}
            <p>Loading your boards...</p>
        {:else }
            {#each $boards as board}
                <Board bind:board={board}/>
            {/each}
        {/if}

    </div>

</div>


