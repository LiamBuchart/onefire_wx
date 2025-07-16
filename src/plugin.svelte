<div class="plugin__mobile-header">
    { title }
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={ () => bcast.emit('rqstOpen', 'menu') }
    >
    { title }
    </div>

    <p class="size-l">
        Plot latest wildfire perimeters for a specified country.
        <b>These are estimated</b> by satellite and should only be used for informational purposes.
    </p>

    <p>
        Canadian Perimeters Provided by <a href="https://cwfis.cfs.nrcan.gc.ca/downloads/hotspots" class="clickable dotted" target="_top">CWFIS</a>
    </p>

    <p class="mt-30 mb-30">
        <img src="{base}/ag_firepolys_2024.png" alt="2024 Fires" />
    </p>

    <p>
       I hope these perimeters just load!
    </p>

    <div class="centered m-15">
        <button
            class="button button--variant-red"
            class:button--loading={ loader }
            on:click={ getPerimeters }
        >
            Load the Canadian Perimeters
        </button>
    </div>

    <hr />

</section>
<script lang="ts">
    import bcast from "@windy/broadcast";
    import { map } from '@windy/map';
    //import { getGPSlocation } from '@windy/geolocation';

    import { onDestroy } from 'svelte';
    import config from './pluginConfig';

    const { title } = config;
    const base = '../static/data';

    let error: string | null = null;
    let layer: L.GeoJSON | null = null;
    let loader = false;

    //import { perimeters } from './data/Canada_perimeters.json';
    //L.GeoJSON(perimeters).addTo(map)

    const getPerimeters = async () => {

        error = null;
        //loader = true;

        try{
            const response = await fetch('https://localhost:9999/Canada_perimeters.json')
            const geoJsonData = await response.json();
            
            //loader = false;
            if(layer) {
                layer.remove();
            }

            layer = new L.GeoJSON(geoJsonData, {
                style: {
                    color: '#76f5f7',
                    weight: 2,
                    opacity: 0.7,
                    fillOpacity: 0.2,
                    fillColor: 'transparent',
                },
            });

            map.addLayer(layer);

        } catch (e) {
            error = e;
        }

    };
   
    onDestroy(() => {
        // Your plugin will be destroyed
        // Make sure you cleanup after yourself
        if(layer) {
            layer.remove();
        }
    });
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
    code {
        color: lightgray;
    }
    img {
        display: block;
        width: 70%;
        margin: 0 auto;
    }
</style>

