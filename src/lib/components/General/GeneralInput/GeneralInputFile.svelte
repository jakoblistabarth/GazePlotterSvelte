<script lang="ts">
    import GeneralInputScaffold from './GeneralInputScaffold.svelte'

    export let legend: string
    export let files: FileList | null = null
    export let multiple: boolean = false
    export let accept: string[] = [] /* e.g. ['image/*', '.pdf'], if empty, allows all */

    const id = `file-${legend.toLowerCase().replace(/\s+/g, '-')}`
</script>

<GeneralInputScaffold {legend} {id}>
    <input type="file" multiple={multiple} accept={accept.join(',')} bind:files />
</GeneralInputScaffold>

<style>
    input[type="file"] {
        cursor: pointer;
    }
    input::file-selector-button {
        border-radius: 4px;
        padding: 0.5rem;
        background: #eee;
        border: 1px solid #ccc;
        color: #666;
    }

</style>
