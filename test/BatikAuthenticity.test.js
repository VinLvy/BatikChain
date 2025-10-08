const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BatikAuthenticity", function () {
    let batikAuthenticity;
    let owner;
    let addr1;

    beforeEach(async function () {
        // Get signers
        [owner, addr1] = await ethers.getSigners();

        // Deploy contract
        const BatikAuthenticity = await ethers.getContractFactory("BatikAuthenticity");
        batikAuthenticity = await BatikAuthenticity.deploy();
        await batikAuthenticity.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await batikAuthenticity.owner()).to.equal(owner.address);
        });

        it("Should start with 0 products", async function () {
            expect(await batikAuthenticity.getTotalProducts()).to.equal(0);
        });
    });

    describe("Adding Products", function () {
        const sampleProduct = {
            id: 1,
            productName: "Batik Test",
            artisanName: "Test Artisan",
            artisanAddress: "Test Address",
            village: "Test Village",
            district: "Test District",
            regency: "Test Regency",
            province: "Test Province",
            coordinates: "0,0",
            technique: "Batik Tulis",
            materials: "Kain, Lilin",
            description: "Test description",
            imageHash: "testImageHash",
            artisanImageHash: "testArtisanHash",
            videoHash: "testVideoHash"
        };

        it("Should add a product successfully", async function () {
            await expect(
                batikAuthenticity.addProduct(
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
                )
            ).to.emit(batikAuthenticity, "ProductAdded")
                .withArgs(sampleProduct.id, sampleProduct.productName, sampleProduct.artisanName, owner.address);

            expect(await batikAuthenticity.getTotalProducts()).to.equal(1);
        });

        it("Should reject adding product with duplicate ID", async function () {
            // Add first product
            await batikAuthenticity.addProduct(
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

            // Try to add product with same ID
            await expect(
                batikAuthenticity.addProduct(
                    sampleProduct.id,
                    "Different Name",
                    "Different Artisan",
                    "Different Address",
                    "Different Village",
                    "Different District",
                    "Different Regency",
                    "Different Province",
                    "1,1",
                    "Different Technique",
                    "Different Materials",
                    "Different Description",
                    "differentImageHash",
                    "differentArtisanHash",
                    "differentVideoHash"
                )
            ).to.be.revertedWith("Product ID already exists");
        });

        it("Should reject adding product with empty name", async function () {
            await expect(
                batikAuthenticity.addProduct(
                    sampleProduct.id,
                    "", // Empty product name
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
                )
            ).to.be.revertedWith("Product name cannot be empty");
        });

        it("Should reject non-owner from adding products", async function () {
            await expect(
                batikAuthenticity.connect(addr1).addProduct(
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
                )
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("Getting Products", function () {
        const sampleProduct = {
            id: 1,
            productName: "Batik Test",
            artisanName: "Test Artisan",
            artisanAddress: "Test Address",
            village: "Test Village",
            district: "Test District",
            regency: "Test Regency",
            province: "Test Province",
            coordinates: "0,0",
            technique: "Batik Tulis",
            materials: "Kain, Lilin",
            description: "Test description",
            imageHash: "testImageHash",
            artisanImageHash: "testArtisanHash",
            videoHash: "testVideoHash"
        };

        beforeEach(async function () {
            await batikAuthenticity.addProduct(
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
        });

        it("Should get product data correctly", async function () {
            const product = await batikAuthenticity.getProduct(sampleProduct.id);

            expect(product.id).to.equal(sampleProduct.id);
            expect(product.productName).to.equal(sampleProduct.productName);
            expect(product.artisanName).to.equal(sampleProduct.artisanName);
            expect(product.village).to.equal(sampleProduct.village);
            expect(product.isVerified).to.be.false;
        });

        it("Should get basic product info correctly", async function () {
            const basicInfo = await batikAuthenticity.getProductBasicInfo(sampleProduct.id);

            expect(basicInfo.id).to.equal(sampleProduct.id);
            expect(basicInfo.productName).to.equal(sampleProduct.productName);
            expect(basicInfo.artisanName).to.equal(sampleProduct.artisanName);
            expect(basicInfo.village).to.equal(sampleProduct.village);
            expect(basicInfo.technique).to.equal(sampleProduct.technique);
            expect(basicInfo.isVerified).to.be.false;
        });

        it("Should reject getting non-existent product", async function () {
            await expect(
                batikAuthenticity.getProduct(999)
            ).to.be.revertedWith("Product does not exist");
        });

        it("Should check verification status correctly", async function () {
            expect(await batikAuthenticity.isProductVerified(sampleProduct.id)).to.be.false;
        });
    });

    describe("Product Verification", function () {
        const sampleProduct = {
            id: 1,
            productName: "Batik Test",
            artisanName: "Test Artisan",
            artisanAddress: "Test Address",
            village: "Test Village",
            district: "Test District",
            regency: "Test Regency",
            province: "Test Province",
            coordinates: "0,0",
            technique: "Batik Tulis",
            materials: "Kain, Lilin",
            description: "Test description",
            imageHash: "testImageHash",
            artisanImageHash: "testArtisanHash",
            videoHash: "testVideoHash"
        };

        beforeEach(async function () {
            await batikAuthenticity.addProduct(
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
        });

        it("Should verify product successfully", async function () {
            await expect(
                batikAuthenticity.verifyProduct(sampleProduct.id)
            ).to.emit(batikAuthenticity, "ProductVerified");

            expect(await batikAuthenticity.isProductVerified(sampleProduct.id)).to.be.true;
        });

        it("Should reject verifying non-existent product", async function () {
            await expect(
                batikAuthenticity.verifyProduct(999)
            ).to.be.revertedWith("Product does not exist");
        });

        it("Should reject non-owner from verifying products", async function () {
            await expect(
                batikAuthenticity.connect(addr1).verifyProduct(sampleProduct.id)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });
});
