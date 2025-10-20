const hre = require("hardhat");

async function main() {
    console.log("Deploying BatikChain contract...");

    // Get the contract factory
    const BatikAuthenticity = await hre.ethers.getContractFactory("BatikAuthenticity");

    // Deploy the contract
    const batikAuthenticity = await BatikAuthenticity.deploy();

    // Wait for deployment to complete
    await batikAuthenticity.waitForDeployment();

    const contractAddress = await batikAuthenticity.getAddress();

    console.log("BatikChain deployed to:", contractAddress);
    console.log("Network:", hre.network.name);

    // Save contract address to file for frontend use
    const fs = require('fs');
    const contractInfo = {
        address: contractAddress,
        network: hre.network.name,
        timestamp: new Date().toISOString()
    };

    fs.writeFileSync(
        './contract-info.json',
        JSON.stringify(contractInfo, null, 2)
    );

    console.log("Contract info saved to contract-info.json");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
