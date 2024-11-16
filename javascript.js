 
//  Haroon Naib Khail
 
// in this part we target the elemnt of our html and accessed by the javascript code 
const encryptionBtn = document.getElementById("btn_Enc");
const decryptionBtn = document.getElementById("btn_Decr");
const plain_Text_Get = document.getElementById("plainText_get");
const plain_Text_Show = document.getElementById("plainText_show")
const ciper_Text_Show = document.getElementById("ciperText_show");
const ciper_Text_Get = document.getElementById("ciperText_get")
const key_Value_Show = document.getElementById("key_value_show");
const key_Value_Get = document.getElementById("key_value_get");
const select_Enc_algorithm = document.getElementById("select_Enc_algorithm");
const select_Dec_algorithm = document.getElementById("select_Dec_algorithm");


const sign_data_Get = document.getElementById("sign_data");
const signatureBtn = document.getElementById("btn_sign");
const enc_sign_show = document.getElementById("enc_sign_show");
const publicKey_show = document.getElementById("publicKey_show");
const signature_Get = document.getElementById("signature");
const publicKey_Get = document.getElementById("publicKey_Get");
const Digital_enc_Get = document.getElementById("Digital_enc_Get");
const verifyBtn = document.getElementById("btn_verify");
const verify_show = document.getElementById("verify_show");


const Get_message = document.getElementById("message");
const SendBtn = document.getElementById("btn_send");
const recived_message = document.getElementById("recived_message");
const CheckBtn = document.getElementById("btn_check");


// in this section when user click on send button the messege will send and when user click on check
// messege the messege will checked 
SendBtn.addEventListener('click' , function() {
        let message = Get_message.value;
        var generateHash = MIDS(message , "sender", 0 );
        console.log(generateHash);
        
        CheckBtn.addEventListener('click' , function () {
                let recMess = recived_message.value;
                MIDS(recMess, "reciver" , generateHash);
        })
})






// in this section when user click on button the signature will be send
signatureBtn.addEventListener('click' , function () {

        let text = sign_data_Get.value;
        let signature = Digital_Signature(text , 0 , 0 , 1);
        enc_sign_show.innerHTML = `${signature}`;
        publicKey_show.innerHTML= `${publickey}`;

})
// in this section when the user click the signature will be verify
verifyBtn.addEventListener('click', function () {
        
        let text = signature_Get.value; 
        let key = publicKey_Get.value;
        let enc_sign = Digital_enc_Get.value;
        const verify = Digital_Signature(text, key , enc_sign , 2);
        verify_show.innerHTML = `${verify}`;


})



// in this section we can encrypt when user click on button of first 
encryptionBtn.addEventListener('click', function(){
       
        var option = select_Enc_algorithm.value;
        let text = plain_Text_Get.value;

        if (option == "Ciper_encryption") {
                const Key = Math.floor((Math.random() * 26)+1);
                let Ciper_Text_Ceaser = Ceaser_Ciphers(text, Key, 1);

                ciper_Text_Show.innerHTML = `${Ciper_Text_Ceaser}`;
                key_Value_Show.innerHTML= `${Key}`;  

        }
        else if (option == "AES_encryption") {
                const random_KEY_String = ((Math.random().toString(36)) + (Math.random().toString(36))).substring(2,18);
                let Ciper_Text_AES  = AES(text, random_KEY_String, 1);

                ciper_Text_Show.innerHTML = `${Ciper_Text_AES}`;
                key_Value_Show.innerHTML= `${random_KEY_String}`;

        }
        else if (option == "DES_encryption") {
                const random_KEY_String = ((Math.random().toString(36)) + (Math.random().toString(36))).substring(2,18);
                let Ciper_Text_DES  = DES(text, random_KEY_String, 1);

                ciper_Text_Show.innerHTML = `${Ciper_Text_DES}`;
                key_Value_Show.innerHTML= `${random_KEY_String}`;

        }
        else if (option == "RSA_encryption") {
               
                let encryption_and_publickey  = RSA(text, 0 ,1);
                let enctext = encryption_and_publickey[0];
                let public_key = encryption_and_publickey[1];
                ciper_Text_Show.innerHTML = `${enctext}`;
                key_Value_Show.innerHTML= `${public_key}`;

        }
        else if (option == "md5"){
                
                let hashText = MD_5(text);
                ciper_Text_Show.innerHTML = `${hashText}`;

        } 
        else if (option == "sha-1"){

                let hashText = SHA_1(text);
                ciper_Text_Show.innerHTML = `${hashText}`;
        }  
        else if (option == "sha-256"){

                let hashText = SHA_256(text);
                ciper_Text_Show.innerHTML = `${hashText}`;

        }
        else if (option == "sha-512"){

                let hashText = SHA_512(text);
                ciper_Text_Show.innerHTML = `${hashText}`;

        }
        else if (option == "sha-3"){

                let hashText = SHA_3(text);
                ciper_Text_Show.innerHTML = `${hashText}`;
        }
        else if (option == "ripemd-160"){
                let hashText = RIPEMD_160(text);
                ciper_Text_Show.innerHTML = `${hashText}`;
        }
        
});



// in this section we decrypt when user click on the button
decryptionBtn.addEventListener("click", function(){

        let option = select_Dec_algorithm.value;
        var ciperText = ciper_Text_Get.value;
        var key = key_Value_Get.value;
        if (option == "Ciper_Decryption") {
                
                
                const plainText = Ceaser_Ciphers(ciperText, key, 2);
                plain_Text_Show.innerHTML = `${plainText}`; 

        }
        else if (option == "AES_Decryption") {
        
               const plainText = AES(ciperText , key, 2);
               plain_Text_Show.innerHTML = `${plainText}`;

        }
        else if (option == "DES_Decryption") {
                
                const plainText = DES(ciperText , key, 2);
                plain_Text_Show.innerHTML = `${plainText}`;

        }
        else if (option == "RSA_Decryption") {

                const decyrption_and_key = RSA(ciperText , key ,  2);
                let textshow = decyrption_and_key[0];
                plain_Text_Show.innerHTML = `${textshow}`;
                
        }
});


// ceaser ciper encryption and decyrption part
const Alphapet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Ceaser_Ciphers(textValue, KEY, mode) {
        
        const Text = textValue.toUpperCase().trim();
        
        
        if (mode == 1) {
                // Encryption part
                for (let index = 0; index < Text.length; index++) {
                        for (let x = 0; x < Alphapet.length; x++) {
                            if (Text[index] === Alphapet[x]){
                                var indexNumber = Alphapet.indexOf(`${Alphapet[x]}`);         
                                } 
                        }
        
                        var Enc = (indexNumber + KEY) % 26;
                        
                        for (let y = 0; y < Alphapet.length; y++) {
                            if (Enc === Alphapet.indexOf(`${Alphapet[y]}`) ) {
                                var result = result + Alphapet[y];            
                                }    
                        }            
                }

        }else if (mode == 2) {
                // Decryption part
                for (let index = 0; index < Text.length; index++) {
                        for (let x = 0; x < Alphapet.length; x++) {
                           if (Text[index] === Alphapet[x]){
                                var indexNumber = Alphapet.indexOf(`${Alphapet[x]}`);
                           }    
                       }

                       if (indexNumber >= KEY) {
                                var Decryption = (indexNumber - KEY) % 26;       
                       }
                       else{
                                Decryption = 26 + (indexNumber - KEY);
                       }
                        

                        for (let y = 0; y < Alphapet.length; y++) {
                            if (Decryption === Alphapet.indexOf(`${Alphapet[y]}`) ) {
                                result = result + Alphapet[y]; 
                                console.log(result);
                            }
                        }        
                }  
        }
        
     return result.replace("undefined","");   
}







// AES encryption and decyrption part
function AES (textValue , KEY , mode) {
        // Encryption part
        if (mode == 1) {
                var result = CryptoJS.AES.encrypt(textValue, KEY);

        }
        // decryption part
        else if (mode == 2) {
                result = CryptoJS.AES.decrypt(textValue, KEY).toString(CryptoJS.enc.Utf8);
                
        }

        return result.toString();
}


// DES encryption and decryption part
function DES (textValue , KEY , mode) {
        if (mode == 1) {
                var result = CryptoJS.DES.encrypt(textValue, KEY);

        }
        // decryption part
        else if (mode == 2) {
                result = CryptoJS.DES.decrypt(textValue, KEY).toString(CryptoJS.enc.Utf8);
                
        }

        return result.toString();

}



// RSA algorithm
var cryptofunction = new JSEncrypt();
var publickey = cryptofunction.getPublicKey();
var privatekey = cryptofunction.getPrivateKey();
function RSA (text , key , mode) {

        
        cryptofunction.setPublicKey(publickey);
        cryptofunction.setPrivateKey(privatekey);

        // encryption part
        if (mode == 1 ) {
                var result = cryptofunction.encrypt(text);
                console.log(result);
        }
        // decryption part
        else if (mode == 2 && key == publickey) {
                var result = cryptofunction.decrypt(text);  
        }
        var result1 = [result , publickey];

        return result1;
}



// Digital Signature
function Digital_Signature (text , key, enc , mode) {
        
        // signature generation
        if (mode == 1) {
                let signature = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
                signature.init(privatekey);
                signature.updateString(text);
                let signature_enc_value = signature.sign();
                var result = signature_enc_value;
                     
        }

        // verifying the signature
        if (mode == 2) {

                        let signature2 = new KJUR.crypto.Signature({'alg':'SHA1withRSA'});
                                signature2.init(key);
                                signature2.updateString(text);
                                let isValid = signature2.verify(enc);
                                result = isValid;         
        }

        return result;
}


// MD5 
function MD_5(text) {
        let hash = CryptoJS.MD5(text);
        
        return hash;
}

// SHA-1
function SHA_1(text) {
        let hash = CryptoJS.SHA1(text);

        return hash;
}

// SHA-256
function SHA_256(text) {
        let hash = CryptoJS.SHA256(text);

        return hash;
}

// SHA-512
function SHA_512(text) {
        let hash = CryptoJS.SHA512(text);

        return hash;
        
}

// SHA-3
function SHA_3(text) {
        let hash = CryptoJS.SHA3(text);

        return hash;
}

// RIPEMD-160
function RIPEMD_160(text) {
        let hash = CryptoJS.RIPEMD160(text);

        return hash;
}


// Message integrity detection part
function MIDS(message , mode , hashCkeing) {
        
        // sender
        if(mode == "sender"){
        var Sender_hash = CryptoJS.MD5(message).toString();
        }
        else if(mode == "reciver"){
                
                // reciver
                var reciver_hash = CryptoJS.MD5(message).toString();
                
                // integrity
                if ( hashCkeing == reciver_hash ) {
                        console.log("ok");
                        document.getElementById("detection").innerHTML = "Message is valid";
                }
                else{
                        console.log("no");
                        document.getElementById("detection").innerHTML = "Message is invalid";
                }

        }
        console.log(reciver_hash);
        console.log(Sender_hash);
        return Sender_hash;
}


