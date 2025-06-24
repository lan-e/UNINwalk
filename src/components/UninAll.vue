<template>
    <div class="map-container">
        <svg viewBox="0 0 413 321" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_7_1530)">
                <!-- Parking and other paths -->
                <path
                    d="M60.2362 181.812V199.071H53.6453V210.022H399.206V198.982H341.901V181.812H264.684V199.032H134.059V181.812H60.2362Z"
                    fill="#E7E7E8" />
                <path
                    d="M196.633 215.736C203.385 215.736 208.858 210.233 208.858 203.446C208.858 196.658 203.385 191.156 196.633 191.156C189.882 191.156 184.409 196.658 184.409 203.446C184.409 210.233 189.882 215.736 196.633 215.736Z"
                    fill="#E7E7E8" />
                <path d="M200.008 213.494H191.601V315.892H200.008V213.494Z" fill="#E7E7E8" />
                <path
                    d="M361.131 35.4815V27.0302H351.58V12.9546H343.173V59.159H268.571L303.618 5.69366H293.87L215.104 124.815C215.104 124.815 192.114 162.915 192.114 192.177H200.748C200.748 192.177 208.227 139 222.997 139H351.452V96.3466H361.131V88.2127H351.856V35.4815H361.131ZM343.43 130.707H222.07L262.937 67.7293H343.4L343.43 130.707Z"
                    fill="#E7E7E8" />
                <path
                    d="M244.605 242.419L248.197 295.021H406.695L399.206 217.839H234.255V224.753H129.796V216.688H6.36401V283.118H102.101V315.882H121.587V242.032L244.605 242.419Z"
                    fill="#8489A7" />
                <path
                    d="M59.0917 234.93C65.9984 234.93 69.8858 238.898 69.8858 245.256C69.8858 251.882 65.8602 256.068 58.5194 256.068H54.1682V264.688H49.2349V234.93H59.0917ZM54.1583 251.733H58.3221C62.6832 251.733 64.6664 249.749 64.6664 245.494C64.6664 241.239 62.6338 239.304 57.8978 239.304H54.1583V251.733Z"
                    fill="white" />
                <path
                    d="M325.305 243.758C332.212 243.758 336.099 247.726 336.099 254.094C336.099 260.71 332.073 264.896 324.733 264.896H320.372V273.516H315.497V243.758H325.305ZM320.372 260.571H324.545C328.896 260.571 330.889 258.588 330.889 254.332C330.889 250.077 328.857 248.142 324.121 248.142H320.372V260.571Z"
                    fill="white" />

                <!-- UNIN2 Section -->
                <g @click="navigateTo('UNIN2')" class="clickable-area">
                    <path
                        d="M15.7866 145.269H53.4675V150.774H143.481L148.701 145.527H186.253V182.258H148.701V175.989H111.395V197.365H87.9714V176.505H53.4675V182.645H15.7866V145.269Z"
                        fill="#ED1C24" stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M15.7866 145.269L9.4917 151.597V188.983L15.7866 182.645V145.269Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M53.4675 182.645L47.1726 188.983H9.4917L15.7866 182.645H53.4675Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M53.4675 182.645H81.9921L87.9714 176.505L53.4675 176.564V182.645Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M81.9922 182.645V203.694L88.1293 197.524L87.9714 176.505L81.9922 182.645Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M81.9922 203.694H105.347L111.523 197.494H88.1293L81.9922 203.694Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M148.701 175.989L142.021 182.704H111.395V175.989H148.701Z" fill="#B11116" stroke="white"
                        stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M148.701 175.989V182.258L142.021 188.983V182.704L148.701 175.989Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M148.701 182.258H186.253L179.603 188.944H142.021L148.701 182.258Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <!-- UNIN2 title -->
                    <path
                        d="M78.4106 166.516C79.6341 166.516 80.305 166.1 80.305 164.443V158.065H82.9395V164.651C82.9395 167.429 81.045 168.768 78.2034 168.768C75.8946 168.768 73.7042 167.885 73.7042 165.187V158.065H76.3781V164.711C76.3781 166.288 77.5029 166.516 78.4106 166.516Z"
                        fill="white" />
                    <path
                        d="M87.6163 162.519H87.4288V168.609H84.824V158.065H87.3104L91.7208 164.016H91.9379V158.065H94.5427V168.609H92.0366L87.6163 162.519Z"
                        fill="white" />
                    <path d="M99.1307 168.609H96.4667V158.065H99.1307V168.609Z" fill="white" />
                    <path
                        d="M103.906 162.519H103.689V168.609H101.084V158.065H103.571L107.981 164.016H108.198V158.065H110.803V168.609H108.297L103.906 162.519Z"
                        fill="white" />
                    <path d="M112.589 163.57H116.378V165.326H112.589V163.57Z" fill="white" />
                    <path
                        d="M121.301 161.457C121.301 160.376 120.482 160.039 119.436 160.039C118.817 160.07 118.204 160.176 117.611 160.356L117.305 158.372C118.261 158.058 119.26 157.897 120.265 157.896C122.239 157.896 123.995 158.67 123.995 160.951C123.995 162.995 122.801 164.731 120.285 166.099V166.288H124.093V168.609H117.394L117.325 166.972C119.101 165.375 121.301 163.53 121.301 161.457Z"
                        fill="white" />
                </g>

                <!-- UNIN1 Section -->
                <g @click="navigateTo('UNIN1')" class="clickable-area">
                    <path
                        d="M228.907 145.269H266.588V150.774H356.602L361.821 145.527H399.374V182.258H361.821V175.989H324.515V197.365H301.092V176.505H266.588V182.645H228.907V145.269Z"
                        fill="#ED1C24" stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M228.907 145.269L222.612 151.597V188.983L228.907 182.645V145.269Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M266.588 182.645L260.293 188.983H222.612L228.907 182.645H266.588Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M266.588 182.645H295.113L301.092 176.505L266.588 176.564V182.645Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M295.113 182.645V203.694L301.25 197.524L301.092 176.505L295.113 182.645Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M295.113 203.694H318.467L324.644 197.494H301.25L295.113 203.694Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M361.821 175.989L355.142 182.704H324.516V175.989H361.821Z" fill="#B11116" stroke="white"
                        stroke-width="0.5" stroke-linejoin="bevel" />

                    <path d="M361.821 175.989V182.258L355.142 188.983V182.704L361.821 175.989Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M361.821 182.258H399.374L392.724 188.944H355.142L361.821 182.258Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-miterlimit="10" />
                    <!-- UNIN1 title -->
                    <path
                        d="M291.531 166.516C292.755 166.516 293.426 166.1 293.426 164.443V158.065H296.06V164.651C296.06 167.429 294.166 168.768 291.324 168.768C289.015 168.768 286.825 167.885 286.825 165.187V158.065H289.499V164.711C289.499 166.288 290.623 166.516 291.531 166.516Z"
                        fill="white" />
                    <path
                        d="M300.737 162.519H300.549V168.609H297.945V158.065H300.431L304.841 164.016H305.058V158.065H307.663V168.609H305.157L300.737 162.519Z"
                        fill="white" />
                    <path d="M312.251 168.609H309.587V158.065H312.251V168.609Z" fill="white" />
                    <path
                        d="M317.027 162.519H316.81V168.609H314.205V158.065H316.691L321.102 164.016H321.319V158.065H323.924V168.609H321.417L317.027 162.519Z"
                        fill="white" />
                    <path d="M325.709 163.57H329.498V165.326H325.709V163.57Z" fill="white" />
                    <path d="M331.837 160.396L330.071 160.545V158.561L334.441 158.045V168.619H331.837V160.396Z"
                        fill="white" />

                </g>

                <!-- UNIN3 Section -->
                <g @click="navigateTo('UNIN3')" class="clickable-area unin3">
                    <path d="M398.486 5.69373H369.073V113.011H398.486V5.69373Z" fill="#ED1C24" stroke="white"
                        stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M369.073 113.021L361.565 120.57V13.2523L369.073 5.69373V113.021Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <path d="M398.486 113.021L390.987 120.56H361.565L369.073 113.011L398.486 113.021Z" fill="#B11116"
                        stroke="white" stroke-width="0.5" stroke-linejoin="bevel" />
                    <!-- UNIN3 title -->
                    <path
                        d="M380.519 39.2707C380.519 40.5007 380.943 41.1753 382.581 41.1753H388.925V43.8237H382.384C379.611 43.8237 378.289 41.9192 378.289 39.0724C378.289 36.7413 379.157 34.5491 381.841 34.5491H388.925V37.2273H382.315C380.756 37.2273 380.519 38.3581 380.519 39.2707Z"
                        fill="white" />
                    <path
                        d="M384.495 48.5255V48.3073H378.437V45.6885H388.925V48.1882L383.005 52.6222V52.8404H388.925V55.4591H378.437V52.9495L384.495 48.5255Z"
                        fill="white" />
                    <path d="M378.437 60.1113V57.4232H388.925V60.1113H378.437Z" fill="white" />
                    <path
                        d="M384.495 64.9023V64.6841H378.437V62.0654H388.925V64.6047L383.005 69.0387V69.2569H388.925V71.8756H378.437V69.366L384.495 64.9023Z"
                        fill="white" />
                    <path d="M383.43 73.6313V77.4404H381.683V73.6313H383.43Z" fill="white" />
                    <path
                        d="M378.703 78.343L380.677 78.6604C380.443 79.2956 380.323 79.9672 380.322 80.6443C380.322 81.7652 380.677 82.3703 381.535 82.3703C382.394 82.3703 382.976 81.7057 382.976 80.0392H384.673C384.791 81.2494 384.89 82.0231 385.965 82.0231C386.755 82.0231 387.021 81.5668 387.021 80.6741C387.004 80.0568 386.898 79.4453 386.705 78.8588L388.55 78.5116C388.884 79.4209 389.064 80.3797 389.083 81.3486C389.083 83.6102 388.097 84.6815 386.547 84.6815C386.033 84.6993 385.53 84.5338 385.125 84.2143C384.721 83.8949 384.442 83.442 384.337 82.9357H384.15C384.128 83.253 384.042 83.5626 383.898 83.8456C383.754 84.1287 383.554 84.3794 383.31 84.5824C383.067 84.7855 382.785 84.9368 382.481 85.0272C382.178 85.1175 381.859 85.145 381.545 85.108C379.641 85.108 378.279 83.8284 378.279 81.0113C378.264 80.1037 378.407 79.2005 378.703 78.343Z"
                        fill="white" />
                </g>
            </g>
        
            <!-- User location marker - only shown when near buildings -->
            <g v-if="userPosition && isNearBuildings" :transform="`translate(${userPosition[0]}, ${userPosition[1]})`">
                <circle r="8" fill="#4299E1" opacity="0.8" />
                <circle r="4" fill="#2B6CB0" />
                <circle r="12" fill="none" stroke="#2B6CB0" stroke-width="2" stroke-dasharray="2,2">
                    <animate 
                        attributeName="r" 
                        from="8" 
                        to="16" 
                        dur="1.5s" 
                        repeatCount="indefinite" 
                    />
                    <animate 
                        attributeName="opacity" 
                        from="0.8" 
                        to="0" 
                        dur="1.5s" 
                        repeatCount="indefinite" 
                    />
                </circle>
            </g>
        
            <defs>
                <clipPath id="clip0_7_1530">
                    <rect width="413" height="321" fill="white" />
                </clipPath>
            </defs>
        </svg>
    
        <div>
            <p>{{ $t('building_info_message') }}
                <span v-if="!userPosition">
                    {{ $t('map_instructions') }}
                </span>
            </p>
        </div>
        <div>
            <button 
                v-if="showLocationButton"
                style="margin-top: 16px"
                @click="getUserLocation"
            >
                {{ $t('your_location_button') }}
            </button>
            <div v-if="error">{{ error }}</div>
            <div v-if="userPosition">
                <p v-if="isNearBuildings">
                    {{
                        t('location_nearby', { 
                            distance: nearestBuildingInfo?.distance, 
                            building: nearestBuildingInfo?.nearestBuilding 
                        })
                    }}
                </p>
                <p v-else>
                    {{
                        t('location_far', { 
                            distance: nearestBuildingInfo?.distance, 
                            building: nearestBuildingInfo?.nearestBuilding
                        })
                    }}
                </p>
            </div>
        </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const userPosition = ref(null);
const error = ref(null);
const showLocationButton = ref(true);
const isNearBuildings = ref(true);
const nearestBuildingInfo = ref({})

// Maximum distance (in degrees) to be considered "near" a building
// This is approximately 200-300 meters in real-world distance at this latitude
const MAX_NEARBY_DISTANCE = 0.0015;

const navigateTo = (destination) => {
    router.push(`/${destination}`);
};

// Find the nearest building and check if user is within range
const findNearestBuilding = (lat, lng) => {
  // Calculate distance to each building
  const buildingDistances = referencePoints.map((point, index) => {
    const buildingNames = ['UNIN1', 'UNIN2', 'UNIN3'];
    const latDiff = lat - point.gps[0];
    const lngDiff = lng - point.gps[1];
    
    // Euclidean distance in degrees
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    
    return {
      building: buildingNames[index],
      distance: distance
    };
  });
  
  // Sort by distance
  buildingDistances.sort((a, b) => a.distance - b.distance);
  
  // Check if user is within range of any building
  const nearest = buildingDistances[0];
  const isNear = nearest.distance < MAX_NEARBY_DISTANCE;
  
  // Format distance in meters (very approximate conversion at this latitude)
  const distanceInMeters = Math.round(nearest.distance * 111000);
  
  return {
    isNear,
    nearestBuilding: nearest.building,
    distance: distanceInMeters,
  };
};

// Building reference points with actual GPS coordinates
const referencePoints = [
  // UNIN1 building
  { gps: [46.300590, 16.327438], svg: [313, 170] },
  // UNIN2 building
  { gps: [46.300312, 16.326322], svg: [100, 170] },
  // UNIN3 building
  { gps: [46.301074, 16.327584], svg: [380, 60] }
];

// Function to get user's current location
const getUserLocation = () => {
  showLocationButton.value = false;
  
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by your browser';
    showLocationButton.value = true;
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Use actual GPS coordinates from the browser
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      
      // For demo purposes, we can also simulate a position if needed
      // Uncomment these lines to use a simulated position near UNIN1
      // const userLat = referencePoints[0].gps[0] + 0.0001;
      // const userLng = referencePoints[0].gps[1] + 0.0002;
      
      // Check if user is near any building
      nearestBuildingInfo.value = findNearestBuilding(userLat, userLng);
      isNearBuildings.value = nearestBuildingInfo.isNear;
      
      // Transform GPS coordinates to SVG coordinates
      const svgPoint = transformGpsToSvg(userLat, userLng);
      userPosition.value = svgPoint;
      error.value = null;
    },
    (error) => {
      error.value = `Unable to get location: ${error.message}`;
      showLocationButton.value = true;
    },
    { enableHighAccuracy: true }
  );
};

// Transform GPS coordinates to SVG coordinates
const transformGpsToSvg = (lat, lng) => {
  // This transformation uses a triangulation approach with the three known reference points
  // We'll use an affine transformation that accounts for scaling, rotation, and translation
  
  // First, calculate the distances between the input point and each reference point
  const distances = referencePoints.map(point => {
    const latDiff = lat - point.gps[0];
    const lngDiff = lng - point.gps[1];
    // Using a simple Euclidean distance in GPS space (for better accuracy, 
    // you could use Haversine formula for real geographic distances)
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  });
  
  // Find the two closest reference points to use for interpolation
  const sortedIndices = distances
    .map((dist, index) => ({ dist, index }))
    .sort((a, b) => a.dist - b.dist)
    .map(item => item.index);
  
  const closest1 = referencePoints[sortedIndices[0]];
  const closest2 = referencePoints[sortedIndices[1]];
  
  // Calculate weighted position based on distances to the two closest reference points
  const totalDist = distances[sortedIndices[0]] + distances[sortedIndices[1]];
  const weight1 = 1 - (distances[sortedIndices[0]] / totalDist);
  const weight2 = 1 - (distances[sortedIndices[1]] / totalDist);
  
  // Now calculate the weighted average position in SVG coordinates
  const weightSum = weight1 + weight2;
  const svgX = (closest1.svg[0] * weight1 + closest2.svg[0] * weight2) / weightSum;
  const svgY = (closest1.svg[1] * weight1 + closest2.svg[1] * weight2) / weightSum;
  
  return [svgX, svgY];
};
</script>

<style scoped lang="scss">
.map-container {
    width: 100%;
    max-width: 760px;

    .clickable-area {
        cursor: pointer;
        transition: opacity 0.2s;

        path {
            transition: transform 0.3s ease;
            transform-origin: center;
        }

        &.unin3 path {
            transform-origin: right;
        }

        &:hover {
            opacity: 0.8;

            path {
                transform: scale(1.02);
            }
        }
    }
}
</style>