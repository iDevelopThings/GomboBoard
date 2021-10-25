<ListBoards/>

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

<script lang="ts">
	import ListBoards from '../../Modules/Boards/Views/ListBoards.svelte';
</script>
