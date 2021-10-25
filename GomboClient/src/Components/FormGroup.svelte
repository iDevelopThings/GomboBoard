<div class="block form-group" class:error={errors[name]}>
    <slot></slot>
    {#if errors[name]}
        <p class="font-semibold text-red-500 mt-2">{errors[name]}</p>
    {/if}
</div>

<script lang="ts">
	export let errors: { [key: string]: string } = {};
	export let name: string                      = null;
</script>
