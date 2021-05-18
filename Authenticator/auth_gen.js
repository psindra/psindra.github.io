async function getKeyMaterial(password) {
        let enc = new TextEncoder();
        return window.crypto.subtle.importKey(
          "raw", 
          enc.encode(password), 
          {name: "PBKDF2"}, 
          false, 
          ["deriveBits", "deriveKey"]
        );
      }

      /*
      Given some key material and some random salt
      derive an AES-GCM key using PBKDF2.
      */
async function getKey(keyMaterial, salt) {
        return window.crypto.subtle.deriveKey(
          {
            "name": "PBKDF2",
            salt: salt, 
            "iterations": 100000,
            "hash": "SHA-256"
          },
          keyMaterial,
          { "name": "AES-GCM", "length": 256},
          true,
          [ "encrypt", "decrypt" ]
        );
      }
// let salt = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
// let iv = new Uint8Array([12,11,10,9,8,7,6,5,4,3,2,1]);
let password = document.getElementById('password').value;
let keyMaterial = await getKeyMaterial(password);
let key = await getKey(keyMaterial, salt);
let encoded = new TextEncoder().encode("PBTRL4N3CW4B37LZ");
console.info("encoded: " + encoded); 
ciphertext = await window.crypto.subtle.encrypt({name: "AES-GCM",iv: iv},key,encoded);
console.info("encrypted_phrase.Binance: "+new Uint8Array(encrypted_phrase.Binance));
new TextDecoder().decode(await window.crypto.subtle.decrypt({name: "AES-GCM",iv: iv},key,new Uint8Array(encrypted_phrase.Binance).buffer));
console.info("decoded: " + new TextDecoder().decode(await window.crypto.subtle.decrypt({name: "AES-GCM",iv: iv},key,new Uint8Array(encrypted_phrase.Binance).buffer)));
try {
  document.querySelector("#Binance").textContent = new TextDecoder().decode(await window.crypto.subtle.decrypt({name: "AES-GCM",iv: iv},key,new Uint8Array(encrypted_phrase.Binance).buffer));
} catch(e) {};
