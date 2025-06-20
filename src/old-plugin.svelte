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
        Add Canadian wildfire perimeters to the map.
    </p>

    <p>
        At this time all perimeters > 200 hectares are displayed.
    </p>

    <p>
        Visit https://cwfis.cfs.nrcan.gc.ca/home for more information.
    </p>

    <p class="mt-30 mb-30">
        <img src="https://www.windy.com/img/windy-plugins/borat-great-success-ed.png" alt="Borat" />
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
    import { getGPSlocation } from '@windy/geolocation';

    cont dataLocation = '../static/data/';	
    import { onDestroy } from 'svelte';

    import config from './pluginConfig';

    const { title } = config;

    let marker: L.Marker | null = null;
    let loader = false;


    const getMyLoc = async () => {
        loader = true;
        const loc = await getGPSlocation();
        loader = false;
        if (loc) {
            const { lat, lon: lng } = loc;
            map.setView({ lat, lng }, 8);
            marker = new L.Marker({ lat, lng }, { icon: markers.myLocationIcon }).addTo(map);
        }

    const loadFires = () => {
        if (marker) {
            marker.remove();
            marker = null;
        }

        const geoJsonLayer = L.geoJSON(areas, {
            style: {
                color: '#ff0000',
                weight: 2,
                fillOpacity: 0.5
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`<b>${feature.properties.name}</b><br>Area: ${feature.properties.area} hectares`);
            }
        }).addTo(map);

        map.fitBounds(geoJsonLayer.getBounds());
    };

    onDestroy(() => {
        // Your plugin will be destroyed
        // Make sure you cleanup after yourself
        if(marker) {
            marker.remove();
            marker = null;
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
