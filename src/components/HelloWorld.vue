<template>
  <div>
    <v-card style="box-shadow: none">
      <v-container
        fluid
        grid-list-xl
        class="pt-0"
      >
        <v-layout
          row
          wrap
          align-center
          class="pr-2 pl-2"
        >
          <v-flex xs12>
            <div
              v-for="(re, i) in dataR"
              :key="i"
            >
              <div
                v-if="re[0] === 'Text'"
                class="mt-3"
              >
                <span
                  class="font-weight-bold"
                  style="font-size: 18px"
                >{{
                  re[1] || "Text"
                }}</span>
              </div>
              <div
                v-else-if="re[0] === 'Get Location'"
                class="mt-3"
                style="position:relative"
              >
                <input
                  readonly
                  type="text"
                  :placeholder="latlon"
                  class="mb-1"
                  style="
                    background: white;
                    width: 100%;
                    border-radius: 8px;
                    padding: 5px;
                    text-align: left;
                    border: 1px solid #555555;
                  "
                />
                <svg
                  style="position: absolute; right: 20px;top:7px"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  />
                </svg>
                <br />
                <span
                  style="position: relative; top: -2px"
                  class="ml-2"
                >Accuration: {{ accuracy.toFixed() + " m" }}</span>
              </div>
              <div
                v-else-if="re[0] === 'Take Picture'"
                class="mt-3"
              >
                <div
                  v-ripple="{ center: true }"
                  class="text-xs-center"
                >
                  <div
                    v-if="re[0] === 'Take Picture'"
                    class="mb-6"
                  >
                    Add Picture
                    <div v-if="imgUrl == ''">
                      <v-btn
                        class="blue lighten-2 white--text"
                        @click.prevent="takePicture"
                        style="border-radius: 8px"
                        v-if="!localstream"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          class="mr-2"
                        >
                          <path
                            fill="#fff"
                            d="M5 4h-3v-1h3v1zm8 6c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-5v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm13 4c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
                          />
                        </svg>Camera
                      </v-btn>
                    </div>
                    <div>
                      <div
                        style="position: relative; width: 250px"
                        class="d-flex justify-center"
                      >
                        <video
                          autoplay
                          id="video"
                          width="250"
                          style="display: none"
                        ></video>
                        <v-btn
                          class="blue lighten-2 white--text"
                          @click.prevent="takeImage"
                          style="
                            border-radius: 8px;
                            position: absolute;
                            z-index: 1000;
                            margin-left: auto;
                            margin-right: auto;
                            bottom: -30px;
                            left: 50%;
                            text-align: center;
                            transform: translate(-50%, -50%);
                          "
                          v-if="localstream"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            class="mr-2"
                          >
                            <path
                              fill="#fff"
                              d="M5 4h-3v-1h3v1zm8 6c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-5v17h-24v-17h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm13 4c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
                            />
                          </svg>Take Image
                        </v-btn>
                      </div>

                      <canvas
                        id="canvas"
                        style="display: none"
                      ></canvas>
                      <div style="position: relative;width:250px;">
                        <div>
                          <img
                            v-if="imgUrl !== ''"
                            class="output mb-2"
                            :src="imgUrl"
                            style="width: 250px"
                          />
                        </div>
                        <v-btn
                          v-if="imgUrl !== ''"
                          class="red"
                          style="
                            border-radius: 8px;
                            color: white !important;
                            position: absolute;
                            z-index: 1000;
                            margin-left: auto;
                            margin-right: auto;
                            bottom: -20px;
                            left: 50%;
                            text-align: center;
                            transform: translate(-50%, -50%);
                          "
                          @click="removeImage"
                        >
                          <v-icon class="mr-1">delete</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="re[0] === 'Short Answer'"
                class="mt-3"
              >
                <span class="font-weight-bold">{{
                  re[1] || "Short Answer"
                }}</span>
                <br />
                <input
                  type="text"
                  placeholder="Answer"
                  style="
                    width: 100%;
                    background: white;
                    border-radius: 8px;
                    padding: 5px;
                    text-align: left;
                    border: 1px solid #555555;
                  "
                  v-model="resultType[re[1]]"
                />
              </div>
              <div
                v-else-if="re[0] === 'Paragraf'"
                class="mt-3"
              >
                <span class="font-weight-bold">{{ re[1] }}</span>
                <br />
                <textarea
                  style="
                    width: 100%;
                    height: 15vh;
                    padding-left: 5px;
                    padding-top: 5px;
                    border: 1px solid #555555;
                    border-radius: 8px;
                  "
                  placeholder="Answer"
                  v-model="resultType[re[1]]"
                ></textarea>
              </div>
              <div
                v-else-if="re[0] === 'Multiple Choice'"
                class="mt-3"
              >
                {{ re[1] || "Multiple Choice" }}
                <br />
                <div
                  v-for="(res, index) in re"
                  :key="index"
                >
                  <div v-if="index >= 2">
                    <template>
                      <div v-if="res !== '0Th3R5'">
                        <v-radio-group
                          v-model="resultType[re[1]]"
                          class="ma-0 pa-0"
                        >
                          <v-radio
                            color="teal"
                            :label="res"
                            :value="res"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                      <div v-else>
                        <v-radio-group
                          v-model="resultType[re[1]]"
                          class="ma-0 pa-0"
                        >
                          <v-radio
                            color="teal"
                            :value="' '"
                          >
                            <template slot="label">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Others"
                                  value
                                  style="
                                    width: 112%;
                                    background: white;
                                    border-radius: 8px;
                                    padding: 5px;
                                    text-align: left;
                                    border: 1px solid #555555;
                                  "
                                  v-model="boxOthers[re[1]]"
                                />
                              </div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <div
                v-else-if="re[0] === 'Checkbox'"
                class="mt-3"
              >
                {{ re[1] || "Checkbox Menu" }}
                <br />
                <div
                  v-for="(res, index) in re"
                  :key="index"
                >
                  <div v-if="index >= 2">
                    <div v-if="res !== '0Th3R5'">
                      <v-checkbox
                        multiple
                        v-model="resultType[re[1]]"
                        :value="res"
                        :label="res"
                      ></v-checkbox>
                    </div>
                    <div v-else>
                      <v-checkbox
                        multiple
                        v-model="resultType[re[1]]"
                        :value="' '"
                      >
                        <template slot="label">
                          <div>
                            <input
                              type="text"
                              style="
                                width: 112%;
                                background: white;
                                border-radius: 8px;
                                padding: 5px;
                                text-align: left;
                                border: 1px solid #555555;
                              "
                              v-model="checkOthers[re[1]]"
                              placeholder="Others"
                            />
                          </div>
                        </template>
                      </v-checkbox>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="re[0] === 'Dropdown'"
                class="mt-3"
              >
                {{ re[1] || "Dropdown Menu" }}
                <br />
                <vs-select
                  style="
                    width: 100%;
                    background: white;
                    border-radius: 8px;
                    text-align: center !important;
                    border: 1px solid #555555;
                    outline: none;
                  "
                  v-model="selectDefault"
                  v-if="!re[2]"
                >
                  <vs-select-item
                    style="border-radius: 8px; border: none; outline: none"
                    value="empty"
                    text="Empty content"
                  />
                </vs-select>
                <vs-select
                  v-else
                  style="
                    width: 100%;
                    background: white;
                    border-radius: 8px;
                    text-align: left;
                    border: 1px solid #555555;
                  "
                  v-model="resultType[re[1]]"
                >
                  <div
                    v-for="(res, is) in re"
                    :key="is"
                  >
                    <vs-select-item
                      style="border-radius: 8px"
                      v-if="is >= 2"
                      :value="res"
                      :text="res"
                    />
                  </div>
                </vs-select>
              </div>
            </div>
            <div class="text-xs-center mt-4 mb-4">
              <v-btn
                v-if="disable !== true"
                @click="upload"
                color="primary"
              >Submit</v-btn>
              <v-progress-circular
                class="mb-4 mt-4"
                v-else
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- {{this.resultType}} -->
    <!-- {{boxOthers}} -->
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  props: ["idProject"],
  async mounted() {
    // alert(this.notif.status)
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    this.id = params
    const res = await axios.get(
      `https://crowdsource.circlegeo.com/api/project/${params.id}`
    );
    this.dataArr = res.data[0].projectContentMobile;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        this.onWeatherWatchSuccess,
        this.onWeatherError,
        { enableHighAccuracy: true }
      );
    }
  },
  data() {
    return {
      id: null,
      imgUrl: "",
      param: "",
      latlon: "",
      dialog: false,
      sh: false,
      selectDefault: "empty",
      boxOthers: {},
      checkOthers: {},
      resultType: {},
      dataArr: [],
      disable: false,
      accuracy: 0,
      localstream: null
    };
  },
  watch: {
    notif(newVal) {
      if (newVal) {
        this.disable = false;
      }
    }
  },
  methods: {
    async upload() {
      // this.disable = true;
      var data = Object.keys(this.boxOthers);
      for (var key in data) {
        if (this.resultType[data[key]] === " ") {
          // console.log( this.resultType[data[key]])
          // console.log(this.boxOthers[data[key]])
          // alert("masuk")
          this.resultType[data[key]] = this.boxOthers[data[key]];
        }
        // console.log(key)
        // console.log(data)
      }

      var data2 = Object.keys(this.checkOthers);
      for (var key2 in data2) {
        this.resultType[data2[key2]].forEach((element, index) => {
          if (element === " ") {
            this.resultType[data2[key2]][index] = this.checkOthers[data2[key2]];
            // console.log( this.checkOthers[data[key]])
          }
        });
      }
      axios
        .post("https://crowdsource.circlegeo.com/api/response/submit", {
          id: this.id ? this.id.id : null,
          projectResponse: this.resultType
        })
        .then(res => {
          alert("success");
        });
      // this.submit();
    },
    onWeatherWatchSuccess(position) {
      var updatedLatitude = position.coords.latitude;
      var updatedLongitude = position.coords.longitude;
      var accuracy = position.coords.accuracy;
      this.accuracy = accuracy;
      this.resultType.lat = updatedLatitude;
      this.resultType.lon = updatedLongitude;
      this.resultType.accuracy = accuracy;
      this.latlon = updatedLatitude + "," + updatedLongitude;
    },
    onWeatherError() {
      // alert("error, no location available");
    },
    showist() {
      this.dialog = true;
    },
    takeImage() {
      //
      const player = document.getElementById("video");
      player.style.display = "none";

      const canvas = document.getElementById("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      canvas.getContext("2d").drawImage(player, 0, 0);
      // Other browsers will fall back to image/png
      this.imgUrl = canvas.toDataURL("image/webp");
      this.resultType.imgURL = this.imgUrl;
      player.pause();
      player.src = "";
      this.localstream.getTracks()[0].stop();
      this.localstream = null;
    },
    takePicture() {
      //
      // create video

      const player = document.getElementById("video");
      player.style.display = "none";

      const constraints = {
        video: {
          facingMode: "environment"
        },
        audio: false
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.localstream = stream;
          player.srcObject = stream;
          player.style.display = "block";
        })
        .catch(e => {
          alert("cannot connect to camera");
        });

      this.imgUrl = "";
    },
    toDataURL(url, callback) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function() {
        var fileReader = new FileReader();
        fileReader.onloadend = function() {
          callback(fileReader.result);
        };
        fileReader.readAsDataURL(httpRequest.response);
      };
      httpRequest.open("GET", url);
      httpRequest.responseType = "blob";
      httpRequest.send();
    },
    showNotif() {
      // alert("masuk");
      // document.addEventListener(
      //   "deviceready",
      //   () => {
      //     cordova.plugins.notification.local.schedule({
      //       title: "Halo berhasil",
      //       text: "dari lulu",
      //       foreground: true,
      //     });
      //   },
      //   false
      // );
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imagePath) {
      this.imgUrl = "data:image/png;base64," + imagePath;
      this.resultType.imgURL = "data:image/png;base64," + imagePath;
      // alert(dataIMG)
    },

    onFail() {
      this.dialog = false;
    },

    removeImage() {
      this.imgUrl = "";
      this.localstream = null;
      // this.resultType[imgURL] = "";
    },

    generateImage: function() {
      let url = this.myCroppa.generateDataUrl("image/jpeg", 0.8);
      if (!url) {
        alert("no image");
        return;
      }
      this.imgUrl = url;
    }
  },
  computed: {
    dataR() {
      // var array = [
      //   "Take Picture",
      //   "Get Location",
      //   "Text:;Ini Text",
      //   "Short Answer:;Ini short answer",
      //   "Paragraf:;Ini Paragraf",
      //   "Multiple Choice:;Ini Multiple Choice:;Ya:;Tidak:;0Th3R5",
      //   "Multiple Choice:;Ini Multiple Choice 2:;Check:;0Th3R5",
      //   "Checkbox:;Ini Checkbox 1:;tes:;0Th3R5",
      //   "Checkbox:;Ini Checkbox 2:;tes 1:;tes 2:;0Th3R5",
      //   "Dropdown:;Ini dropdown:;drop answer 1:;drop answer 2",
      // ];

      var result = [];
      this.dataArr.forEach(ele => {
        result.push(ele.split(":;"));
      });
      return result;
    }
  }
};
</script>
<style>
.v-input__control {
  height: 30px;
}
.v-input--selection-controls {
  margin-top: 0px;
}
.image34 {
  border-radius: 10px !important;
  width: 100%;
}
.selected {
  background: white;
  border: 1px solid #a2a2a2;
  border-radius: 5px;
  width: 100%;
}
</style>