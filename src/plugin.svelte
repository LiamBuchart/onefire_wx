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
        <img src="https://www.windy.com/img/windy-plugins/borat-great-success-ed.png" alt="Borat" />
    </p>

    <p>
        Please allow GPS location in your browser to see your location on the map.
    </p>
    <div class="centered m-15">
        <button
            class="button button--variant-orange"
            class:button--loading={ loader }
            on:click={ getMyLoc }
        >
            Show my location
        </button>
    </div>

    <hr />

</section>
<script lang="ts">
    import bcast from "@windy/broadcast";
    import { map, markers } from '@windy/map';
    //import { getGPSlocation } from '@windy/geolocation';

    import { onDestroy } from 'svelte';

    import config from './pluginConfig';

    const { title } = config;

    // Load the GeoJSON data into the map
    import geoJsonData from './static/data/Canada_perimeters.geojson';
    console.log(geoJsonData)

    //let marker: L.Marker | null = null;
    let layer: L.GeoJSON | null = null;

    // add geojson layer to map

    //const geoJsonData = await geoJson.json();

    if(layer) {
        layer.remove();
    }

    layer = new L.GeoJSON(geoJsonData, {
        style: {
            color: '#76f5f7',
            weight: 2,
            opacity: 0.7,
            fillOpacity: 0.2,
        },
    });

    map.addLayer(layer);
    //map.fitBounds(L.geoJSON(geoJsonData).getBounds());

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

