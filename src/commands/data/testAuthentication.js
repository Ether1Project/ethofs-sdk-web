import { baseUrl, controllerContractAddress, controllerABI } from './../../constants';
import { validateEthofsKey } from '../../util/validators';
import Web3 from 'web3';

export default function testAuthentication(ethofsKey) {

    var web3;
    var account;

    const endpoint = `${baseUrl}`;

    console.log(ethofsKey);

    validateEthofsKey(ethofsKey);

    if (typeof ethofsKey === 'string') {
        web3 = new Web3(endpoint);
        account = web3.eth.accounts.privateKeyToAccount('0x' + ethofsKey);

    } else if (ethofsKey) {
        web3 = new Web3(ethofsKey);
        ethofsKey.enable();
        account = ethofsKey.selectedAddress;
    } else {
        throw new Error('No ethoFS key or web3 provider detected');
    }

    return new Promise((resolve, reject) => {

        web3.eth.net.isListening()
            .then(function () {

                var ethoFSAccounts = new web3.eth.Contract(controllerABI, controllerContractAddress);

                web3.eth.accounts.wallet.add(account);
                web3.eth.defaultAccount = account.address;

                ethoFSAccounts.methods.CheckAccountExistence(web3.eth.defaultAccount).call(function (error, result) {
                    if (!error) {
                        if (result) {
                            //console.log('ethoFS User Found');
                            resolve({
                                authenticated: true
                            });
                        } else {
                            //console.log('ethoFS User Not Found');
                            reject(new Error('ethoFS User Not Found'));
                        }
                    } else {
                        //console.log('Ether-1 RPC Access Error');
                        reject(new Error('Ether-1 RPC Access Error: ${error}'));
                        //reject(new Error('Ether-1 RPC Access Error'));
                    }
                });
            });
    });
};
