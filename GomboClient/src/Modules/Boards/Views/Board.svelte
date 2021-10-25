<script lang="ts">
	import {BoardModel} from "../Model/BoardModel";

	export let board: BoardModel;
</script>

<a href={board.url}
   class="bg-white rounded shadow p-4 hover:bg-gray-50 transition"
>
    <p>{board.title}</p>
</a>
