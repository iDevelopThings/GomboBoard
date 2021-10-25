<div>

    <p class="text-center py-8">
        Logging you out now...
    </p>

</div>

<script lang="ts">

	import {goto} from "$app/navigation";
	import {Http} from "../../Services/Api/Http";

	Http.post('http://localhost:5000/auth/logout')
		.then(() => {
			window.location = '/dashboard';
		});

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
