<script lang="ts">
import MajorButton from '../../General/GeneralButton/GeneralButtonMajor.svelte'
import GeneralInputText from '../../General/GeneralInput/GeneralInputText.svelte'
import GeneralSelectBase from '../../General/GeneralSelect/GeneralSelectBase.svelte'
import { WorkplaceDownloader } from '$lib/class/Downloader/WorkplaceDownloader.js'
import { getData } from '$lib/stores/dataStore.js'

let type: string = 'inner-json'
let fileName = 'GazePlotter-Workplace'

const options = [{
  value: 'inner-json',
  label: 'GazePlotter'
}]

console.log(options)

const handleSubmit = () => {
  const downloader = new WorkplaceDownloader()
  downloader.download(getData(), fileName)
}

</script>

<GeneralSelectBase
        label="Export type"
        options={options}
        bind:value={type}
/>
<GeneralInputText
        legend="File name"
        bind:value={fileName}
/>
<div class="mt-30">
    <MajorButton on:click={handleSubmit}>Download</MajorButton>
</div>

<style>
    .mt-30 {
        margin-top: 30px;
    }
</style>
