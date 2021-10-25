<div class="menu">
    <div class="nav-items">
        {#each leftNavigationLinks as {title, href, active}}
            <a href={href} class:active>
                {title}
            </a>
        {/each}
    </div>
    <div class="nav-items">
        {#each rightNavigationLinks as {title, href, active, showForAuthed}}
            {#if !showForAuthed && !Auth.check()}
                <a href={href} class:active>
                    {title}
                </a>
            {/if}
            {#if showForAuthed && Auth.check()}
                <a href={href} class:active>
                    {title}
                </a>
            {/if}
        {/each}
        {#if Auth.check()}
            <div>
                <p class="text-white text-sm font-semibold">
                    {Auth.user().name}
                </p>
            </div>
        {/if}
    </div>
</div>


<script lang="ts">
	import {getStores, page, session} from '$app/stores';
	import {Auth} from '../Services/Auth';

	let leftNavigationLinks = [
		{
			title  : "Dashboard",
			href   : "/dashboard",
			active : false
		},
		{
			title  : "Create Board",
			href   : "/boards/create",
			active : false
		},
	];

	let rightNavigationLinks = [
		{
			title         : "Register",
			href          : "/auth/register",
			active        : false,
			showForAuthed : false,
		},
		{
			title         : "Login",
			href          : "/auth/login",
			active        : false,
			showForAuthed : false,
		},
		{
			title         : "Logout",
			href          : "/auth/logout",
			active        : false,
			showForAuthed : true,
		},
	];

	page.subscribe(pageValue => {
		leftNavigationLinks = leftNavigationLinks.map(link => ({
			...link,
			active : (link.href === pageValue.path)
		}));

		rightNavigationLinks = rightNavigationLinks.map(link => ({
			...link,
			active : (link.href === pageValue.path)
		}));
	});
</script>


<style lang="postcss">

	.menu {
		@apply bg-gray-900 p-4 flex flex-row items-center justify-between space-x-4;

		> .nav-items {
			@apply flex flex-row items-center space-x-4;

			> a {
				@apply text-gray-300 font-semibold hover:text-gray-200 transition;

				&.active {
					@apply text-blue-400;
				}
			}
		}
	}

</style>

