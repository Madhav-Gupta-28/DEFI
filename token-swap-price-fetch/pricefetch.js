const ethers = require('ethers');

const {
    factoryAddress , routerAddress , fromAddress , toAddress
} = require("./addressList")



const {erc20ABI, factoryABI, pairABI, routerABI} = require("./abiinfo") ;


const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");

const FactoryInstance = new ethers.Contract(factoryAddress, factoryABI, provider);
const RouterInstance = new ethers.Contract(routerAddress, routerABI, provider);

const fetchPrice = async (amount) => {

     const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);
     const token2 = new ethers.Contract(toAddress, erc20ABI, provider)
     const decimal1 = await token1.decimals();
    
     const amountIn = ethers.utils.parseUnits(amount.toString(), decimal1);

     const amountsOut = await RouterInstance.getAmountsOut(amountIn , [fromAddress , toAddress]);

     console.log (`For ${amount} BUSD You will get  ${ethers.utils.formatEther(amountsOut[1].toString())} Wbnb`);
    
}


fetchPrice(27);