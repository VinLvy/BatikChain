const hre = require("hardhat");

async function main() {
    // Get the deployed contract address from contract-info.json
    const fs = require('fs');
    let contractAddress;

    try {
        const contractInfo = JSON.parse(fs.readFileSync('./contract-info.json', 'utf8'));
        contractAddress = contractInfo.address;
        console.log("Using contract at:", contractAddress);
    } catch (error) {
        console.error("Please deploy the contract first by running: npx hardhat run scripts/deploy.js");
        process.exit(1);
    }

    // Get the contract instance
    const BatikAuthenticity = await hre.ethers.getContractFactory("BatikAuthenticity");
    const contract = BatikAuthenticity.attach(contractAddress);

    // Sample product data
    const sampleProduct = {
        id: 2,
        productName: "Batik Mega Mendung Cirebon",
        artisanName: "Bu Sukinah",
        artisanAddress: "Jl. Trusmi Kulon No. 45, Plered",
        village: "Trusmi",
        district: "Plered",
        regency: "Cirebon",
        province: "Jawa Barat",
        coordinates: "-6.7325, 108.4916",
        technique: "Batik Cap",
        materials: "Kain Katun, Malam, Pewarna Sintetis",
        description: "Batik cap khas Cirebon dengan motif Mega Mendung yang ikonik, melambangkan awan pembawa hujan kesuburan.",

        // --- Masukkan HASH (CID) dari Pinata di sini ---
        imageHash: "bafkreiarrbnq5vna43yiqjtssydwztlrdnaramljxhcntrghmu6rek4mzy",
        artisanImageHash: "bafkreiatsvdgiaqgcavb4yao6b7nawix73ezhmgass6of7adv6pc4t3vgy",
        videoHash: "bafybeicfzlwvcequevkx5plnflvkk67fro552yxybamvhz7f7uvembzvv4"
    };

    console.log("Adding sample product...");
    console.log("Product Name:", sampleProduct.productName);
    console.log("Artisan:", sampleProduct.artisanName);

    try {
        // Add the product
        const tx = await contract.addProduct(
            sampleProduct.id,
            sampleProduct.productName,
            sampleProduct.artisanName,
            sampleProduct.artisanAddress,
            sampleProduct.village,
            sampleProduct.district,
            sampleProduct.regency,
            sampleProduct.province,
            sampleProduct.coordinates,
            sampleProduct.technique,
            sampleProduct.materials,
            sampleProduct.description,
            sampleProduct.imageHash,
            sampleProduct.artisanImageHash,
            sampleProduct.videoHash
        );

        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Product added successfully!");

        // Verify the product
        console.log("Verifying product...");
        const verifyTx = await contract.verifyProduct(sampleProduct.id);
        console.log("Verification transaction hash:", verifyTx.hash);
        await verifyTx.wait();
        console.log("Product verified successfully!");

        // Get and display the product data
        console.log("\nRetrieving product data...");
        try {
            const productData = await contract.getProduct(sampleProduct.id);

            console.log("\n=== PRODUCT DATA ===");
            console.log("ID:", productData.id.toString());
            console.log("Product Name:", productData.productName);
            console.log("Artisan Name:", productData.artisanName);
            console.log("Village:", productData.village);
            console.log("District:", productData.district);
            console.log("Regency:", productData.regency);
            console.log("Province:", productData.province);
            console.log("Technique:", productData.technique);
            console.log("Materials:", productData.materials);
            console.log("Description:", productData.description);
            console.log("Coordinates:", productData.coordinates);
            console.log("Is Verified:", productData.isVerified);
            console.log("Mint Date:", new Date(Number(productData.mintDate) * 1000).toLocaleString());

            // Get total products
            const totalProducts = await contract.getTotalProducts();
            console.log("\nTotal products in contract:", totalProducts.toString());
        } catch (retrieveError) {
            console.log("⚠️  Could not retrieve product data:", retrieveError.message);
            console.log("This might be due to local network issues, but the product was added successfully.");
        }

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
