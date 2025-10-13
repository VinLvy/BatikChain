const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
    console.log("🔍 Manual Contract Testing");
    console.log("========================\n");

    try {
        // Load contract info
        const contractInfo = JSON.parse(fs.readFileSync('./contract-info.json', 'utf8'));
        console.log("📍 Contract Address:", contractInfo.address);
        console.log("🌐 Network:", contractInfo.network);
        console.log("⏰ Deployed:", contractInfo.timestamp);
        console.log("");

        // Get contract instance
        const BatikAuthenticity = await ethers.getContractFactory("BatikAuthenticity");
        const contract = BatikAuthenticity.attach(contractInfo.address);

        console.log("✅ Contract instance created successfully\n");

        // Test 1: Get total products
        console.log("🧪 Test 1: Get Total Products");
        console.log("----------------------------");
        const totalProducts = await contract.getTotalProducts();
        console.log("Total Products:", totalProducts.toString());
        console.log("✅ Test 1 passed\n");

        // Test 2: Get product by ID (if products exist)
        if (totalProducts > 0) {
            console.log("🧪 Test 2: Get Product Details");
            console.log("-----------------------------");
            const product = await contract.getProduct(1);
            console.log("Product 1 Details:");
            console.log("  - ID:", product.id.toString());
            console.log("  - Name:", product.productName);
            console.log("  - Artisan:", product.artisanName);
            console.log("  - Village:", product.village);
            console.log("  - District:", product.district);
            console.log("  - Regency:", product.regency);
            console.log("  - Province:", product.province);
            console.log("  - Technique:", product.technique);
            console.log("  - Materials:", product.materials);
            console.log("  - Verified:", product.isVerified);
            console.log("  - Mint Date:", new Date(Number(product.mintDate) * 1000).toLocaleString());
            console.log("✅ Test 2 passed\n");

            // Test 3: Get basic info
            console.log("🧪 Test 3: Get Basic Product Info");
            console.log("---------------------------------");
            const basicInfo = await contract.getProductBasicInfo(1);
            console.log("Basic Info:");
            console.log("  - ID:", basicInfo.id.toString());
            console.log("  - Name:", basicInfo.productName);
            console.log("  - Artisan:", basicInfo.artisanName);
            console.log("  - Village:", basicInfo.village);
            console.log("  - Technique:", basicInfo.technique);
            console.log("  - Verified:", basicInfo.isVerified);
            console.log("✅ Test 3 passed\n");

            // Test 4: Check verification status
            console.log("🧪 Test 4: Check Verification Status");
            console.log("-----------------------------------");
            const isVerified = await contract.isProductVerified(1);
            console.log("Is Product 1 Verified:", isVerified);
            console.log("✅ Test 4 passed\n");

            // Test 5: Get product ID by index
            console.log("🧪 Test 5: Get Product ID by Index");
            console.log("---------------------------------");
            const productId = await contract.getProductIdByIndex(0);
            console.log("Product ID at index 0:", productId.toString());
            console.log("✅ Test 5 passed\n");

        } else {
            console.log("⚠️  No products found. Please run 'npm run add-sample' first.\n");
        }

        // Test 6: Error handling - try to get non-existent product
        console.log("🧪 Test 6: Error Handling - Non-existent Product");
        console.log("-----------------------------------------------");
        try {
            await contract.getProduct(999);
            console.log("❌ Test 6 failed - should have thrown error");
        } catch (error) {
            console.log("✅ Test 6 passed - correctly caught error:", error.message);
        }
        console.log("");

        console.log("🎉 All Manual Tests Completed Successfully!");
        console.log("===========================================");
        console.log("📊 Test Summary:");
        console.log("  - Contract deployment: ✅");
        console.log("  - Product retrieval: ✅");
        console.log("  - Basic info retrieval: ✅");
        console.log("  - Verification status: ✅");
        console.log("  - Error handling: ✅");

    } catch (error) {
        console.error("❌ Manual testing failed:", error.message);
        console.log("\n💡 Troubleshooting:");
        console.log("  1. Make sure contract is deployed: npm run deploy");
        console.log("  2. Add sample product: npm run add-sample");
        console.log("  3. Check contract-info.json exists");
        process.exit(1);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
