var script = document.createElement("script");
var urlParams = new URLSearchParams(window.location.search);
var apiKey = urlParams.get("gigya");
var locale = urlParams.get("locale") || "ja-JP";
script.type = "text/javascript";
script.src = "https://cdns.gigya.com/js/gigya.js?apikey=" + apiKey;
script.async = true;
document.head.appendChild(script);
script.addEventListener("load", () => {
    window.onload = function () {
        gigya.accounts.showScreenSet({
            screenSet: 'plusid-RegistrationLogin',
            containerID: 'plus_id_anchor',
            lang: locale,
            onHide: function (event) {
                //user completed the flow
                var payload = {};
                payload['social_token'] = event.user.UID;
                payload['social_token_signature'] = event.user.UIDSignature;
                payload['signature_timestamp'] = event.user.signatureTimestamp;

                console.log(event.user);
            }
        });
    };
});