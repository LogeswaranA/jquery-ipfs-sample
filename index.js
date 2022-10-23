
const projectId = '';           //<-- Enter your project id from Ipfs infura
const projectSecret = '';       //<-- Enter your project Secret from IPFS infura
var buffer = window.buffer;

console.log("bufffer value is",buffer);

const auth = 'Basic ' + buffer.Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = window.IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',headers: {
    authorization: auth}, 
});

async function uploadfile() {
    const reader = new FileReader();
    reader.onloadend = function () {
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.add(buf, (err, result) => { // Upload buffer to IPFS
            if (err) {
                console.error(err)
                return
            }
            // return hash;
            let url = `https://ipfs.io/ipfs/${result[0].hash}`
            console.log("Image Loaded", url)
            $(".js-uploaded-hash").attr("data-hash", url);
        })
    }
    const photo = document.getElementById("memories");
    reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
    
}

const uploaddata = async (data) => {
    const buft = buffer.Buffer(data);
    ipfs.add(buft, (err, result) => { // Upload buffer to IPFS
        if (err) {
            console.error(err)
            return
        }
        var metadataurl = `https://ipfs.io/ipfs/${result[0].hash}`;
        return metadataurl;
    })
}