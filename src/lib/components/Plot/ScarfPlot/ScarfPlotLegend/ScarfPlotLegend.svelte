<script lang="ts">
import ScarfPlotLegendGroup from './ScarfPlotLegendGroup.svelte'
import type { StylingScarfFillingType } from '$lib/type/Filling/ScarfFilling'

export let filling: StylingScarfFillingType

</script>

    <ScarfPlotLegendGroup title="Fixations" fillings={filling.aoi} />
    <ScarfPlotLegendGroup title="Non-fixations" fillings={filling.category} />
    {#if filling.visibility.length > 0}
        <ScarfPlotLegendGroup title="Is AOI visible" fillings={filling.visibility} isVisibility={true} />
    {/if}
