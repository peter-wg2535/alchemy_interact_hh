const hre =require("hardhat")
const contract_json=require("../artifacts/contracts/Greeter.sol/Greeter.json")

const abi=contract_json.abi


async function main(){

const alchemy_provider=new hre.ethers.providers.AlchemyProvider(
    'maticmum',process.env.ALCHEMY_MUMBAI_API_KEY
)
 // We're using the same wallet private key for the wallet that you
    // created in Step 6. 
const userWallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, alchemy_provider);
const greeting_ct=new hre.ethers.Contract(
    process.env.ALCHEMY_MUMBAI_CONTRACT_ADDRESS
    ,abi
    ,userWallet)

const setTx1=await greeting_ct.setGreeting("Hi Web3 Alchemy Project!")
await setTx1.wait()

const greet_msg=await greeting_ct.greet()
console.log("After set message :"+ greet_msg)


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
