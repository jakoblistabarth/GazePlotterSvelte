<script lang="ts">
  import { onMount } from 'svelte'
  import type { ExtendedInterpretedDataType } from '../../../type/Data/InterpretedData/ExtendedInterpretedDataType'
  import { getAois, getStimuli, updateMultipleAoi } from '../../../stores/dataStore'
  import GeneralSelectBase from '../../General/GeneralSelect/GeneralSelectBase.svelte'
  import GeneralButtonMinor from '../../General/GeneralButton/GeneralButtonMinor.svelte'
  import { flip } from 'svelte/animate'
  import GeneralRadio from '../../General/GeneralRadio/GeneralRadio.svelte'
  import GeneralButtonMajor from '../../General/GeneralButton/GeneralButtonMajor.svelte'
  import { addErrorToast, addInfoToast, addSuccessToast } from '../../../stores/toastStore'

  export let selectedStimulus: string = '0'
  export let userSelected: string = 'this'
  let aoiObjects: ExtendedInterpretedDataType[] = [] /* Order in array is also important */

  $: {
    aoiObjects = getAois(parseInt(selectedStimulus))
  }

  /**
   * TODO: Make reactive in the future (when stimuli can be updated)
   */
  const stimuliOption = getStimuli().map((stimulus) => {
    return {
      label: stimulus.displayedName,
      value: stimulus.id.toString()
    }
  })

  onMount(() => {
    aoiObjects = getAois(parseInt(selectedStimulus))
    console.log(aoiObjects)
  })

  const handleObjectPositionUp = (aoi: ExtendedInterpretedDataType) => {
    const index = aoiObjects.indexOf(aoi)
    if (index > 0) {
      aoiObjects = [
        ...aoiObjects.slice(0, index - 1),
        aoiObjects[index],
        aoiObjects[index - 1],
        ...aoiObjects.slice(index + 1)
      ]
    }
  }

  const handleObjectPositionDown = (aoi: ExtendedInterpretedDataType) => {
    const index = aoiObjects.indexOf(aoi)
    if (index < aoiObjects.length - 1) {
      aoiObjects = [
        ...aoiObjects.slice(0, index),
        aoiObjects[index + 1],
        aoiObjects[index],
        ...aoiObjects.slice(index + 2)
      ]
    }
  }

  const handleSubmit = () => {
    let handlerTypeForAoiStore: 'this_stimulus' | 'all_by_original_name' | 'all_by_displayed_name' = 'this_stimulus'
    if (userSelected === 'all_original') handlerTypeForAoiStore = 'all_by_original_name'
    if (userSelected === 'all_displayed') handlerTypeForAoiStore = 'all_by_displayed_name'
    try {
      updateMultipleAoi(aoiObjects, parseInt(selectedStimulus), handlerTypeForAoiStore)
    } catch (e) {
      console.error(e)
      addErrorToast('Error while updating AOIs. See console for more details.')
    }
    addSuccessToast('AOIs updated successfully')
    if (handlerTypeForAoiStore !== 'this_stimulus') {
      addInfoToast('Ordering of AOIs is not updated for other stimuli')
    }
  }

</script>

<div class="content">
    <GeneralSelectBase
        label="For stimulus"
        options={stimuliOption}
        bind:value={selectedStimulus}
    />
</div>
{#if (aoiObjects.length === 0)}
    <div>No AOIs found</div>
{/if}
{#if (aoiObjects.length > 0)}
    <table class="grid content">
        <thead>
        <tr class='gr-line header'>
            <th>Name</th>
            <th>Displayed name</th>
            <th>Color</th>
            <th>Order</th>
        </tr>
        </thead>
        <tbody>
        {#each aoiObjects as aoi (aoi.id)}
            <tr class='gr-line' animate:flip>
                <td class="original-name">{aoi.originalName}</td>
                <td>
                    <input type="text" id={aoi.id + 'displayedName'} bind:value={aoi.displayedName} />
                </td>
                <td>
                    <input type="color" id={aoi.id + 'color'} bind:value={aoi.color} />
                </td>
                <td>
                    <div class="button-group">
                        <GeneralButtonMinor isDisabled={aoiObjects.indexOf(aoi) === 0} marginTop="0" on:click={() => handleObjectPositionUp(aoi)}>↑</GeneralButtonMinor>
                        <GeneralButtonMinor isDisabled={aoiObjects.indexOf(aoi) === aoiObjects.length - 1} marginTop="0" on:click={() => handleObjectPositionDown(aoi)}>↓</GeneralButtonMinor>
                    </div>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
    <div class="content">
        <GeneralRadio
                legend="Apply changes to"
                options={[
                  { label: 'This stimulus', value: 'this' },
                  { label: 'All by original name', value: 'all_original' },
                  { label: 'All by displayed name', value: 'all_displayed' }
                ]}
                bind:userSelected
        />
    </div>
    <GeneralButtonMajor on:click={handleSubmit}>
        Apply
    </GeneralButtonMajor>
{/if}

<style>
    /* Component Group */
    input {
        height: 34px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 0;
        padding: 0.5rem;
    }

    input[type="color"] {
        height: 34px;
        width: 50px;
        padding: 4px;
        background: none;
    }

    .button-group {
        display: flex;
        gap: 5px;
        flex-direction: row;
    }

    th {
        text-align: left;
        font-size: 14px;
    }
    .original-name {
        font-size: 14px;
        padding-right: 10px;
        color: #999;
        cursor: not-allowed;
    }
    .content {
        margin-bottom: 25px;
    }
    .original-name {
        line-height: 1;
        white-space: nowrap;
    }
</style>
