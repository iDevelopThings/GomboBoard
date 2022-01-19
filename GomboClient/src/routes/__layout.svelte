<Navigation/>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
        <slot/>
    </div>
</div>

<script lang="ts">
	import "../app.css";
	import {session} from "$app/stores";
	import {Api, DataTransferObjectManager} from "api-utilities";

	import Navigation from "../Components/Navigation.svelte";
	import {Auth} from "../Services/Auth";

	DataTransferObjectManager.initiate();
	Api.configure({baseUrl : 'http://127.0.0.1:8081'});

	Auth.initiate($session);
</script>
