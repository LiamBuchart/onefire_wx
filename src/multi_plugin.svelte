<div class="size-s mb-5">Select a country:</div>
<select bind:value={selectedCC}>
    {#each countries as country}
        {@const { cc, title } = country}
        <option value={ cc }>
            { title }
        </option>
    {/each}
</select>
{#if !error}
    <small class="size-xs mt-10">
        Plot latest wildfire perimeters for a specified country.
         <b>These are estimated</b> by satellite and should only be used for informational purposes.
    </small>
    <small class="size-xxs mt-5">
        Canadian Perimeters Provided by <a href="https://cwfis.cfs.nrcan.gc.ca/downloads/hotspots/perimeters" class="clickable dotted" target="_top">CWFIS</a>
    </small>
{:else}
    <small class="rounded-box bg-error size-s mt-10">
        Error: {error}
    </small>
{/if}

<script lang="ts">
    import store from '@windy/store';
    import { map } from '@windy/map';

    import { countries } from "./countries";
    import { onDestroy } from 'svelte';

    const dataLocation = '/Users/liambuchart/Documents/PYTHON/onefire_wx/static/data';

    const userCC = store.get('country');
    const isCountrySupported = countries.some(c => c.cc === userCC);

    let selectedCC: string = isCountrySupported ? userCC : 'cz';
    let error: string | null = null;
    let layer: L.GeoJSON | null = null;

    $: loadSelectedCoutry( selectedCC )

    const loadSelectedCoutry = async (cc: string) => {
        error = null;

        const country = countries.find(c => c.cc === cc);
        if(!country) {
            return;
        }
        const { name, bounds } = country;

        try {
            // import coastline from './coastline.geojson.json'
            const geoJson = await fetch(`${dataLocation}/${name}_perimeters.geojson.json`);
            const geoJsonData = await geoJson.json();

            if(layer) {
                layer.remove();
            }

            layer = new L.GeoJSON(geoJsonData, {
                style: {
                    color: '#76f5f7',
                    weight: 1,
                    opacity: 0.7,
                    fillOpacity: 0.2,
                    fillColor: 'transparent',
                },
            });

            map.addLayer(layer);
            map.fitBounds(bounds[0]);

        } catch (e) {
            error = e;
        }
    };

    onDestroy(() => {
        if(layer) {
            layer.remove();
        }
    });
</script>

<style lang="less">
    small {
        display: block;
        line-height: 1.5;
    }

    select {
        &:focus {
            outline: none;
        }
    }
</style>