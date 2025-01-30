# IPFS Based Decentralised CDN

APIs to be implemented

login
logout

uploadFile
- params: file, credential
- return: ipfs hash


downloadFile
- params: fileId, [credential]
- returns:
{
    'msg': success,
    'file': blob
}

deleteFile
- params: credential, fileId
- returns: 
{
    'msg': 'success'
}

getFiles
- params: credentials
- returns:
{
    'msg': 'success',
    'files': [
        {
            'fileId': 123
            'fileName': script.js
            'fileSize': 25kB
            'visibility': private
            'fileType': text/plain
        },
        ...
    ]
}


