// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BatikAuthenticity
 * @dev Smart contract untuk menyimpan dan memverifikasi data otentik produk batik
 * @author Prototype-5 Team
 */
contract BatikAuthenticity is Ownable, ReentrancyGuard {
    // Struct untuk menyimpan data produk batik
    struct Product {
        uint256 id; // ID unik produk
        string productName; // Nama produk batik
        string artisanName; // Nama pengrajin
        string artisanAddress; // Alamat pengrajin
        string village; // Nama desa
        string district; // Kecamatan
        string regency; // Kabupaten
        string province; // Provinsi
        string coordinates; // Koordinat GPS (lat, lng)
        string technique; // Teknik pembuatan (batik tulis, cap, dll)
        string materials; // Bahan yang digunakan
        string description; // Deskripsi produk
        string imageHash; // Hash dari foto produk
        string artisanImageHash; // Hash dari foto pengrajin
        string videoHash; // Hash dari video proses pembuatan
        uint256 mintDate; // Tanggal minting (timestamp)
        bool isVerified; // Status verifikasi
        address verifiedBy; // Alamat yang melakukan verifikasi
    }

    // Mapping untuk menyimpan produk berdasarkan ID
    mapping(uint256 => Product) public products;

    // Array untuk menyimpan semua ID produk
    uint256[] public productIds;

    // Mapping untuk memeriksa apakah ID sudah digunakan
    mapping(uint256 => bool) public idExists;

    // Event untuk logging
    event ProductAdded(
        uint256 indexed id,
        string productName,
        string artisanName,
        address indexed addedBy
    );

    event ProductVerified(
        uint256 indexed id,
        address indexed verifiedBy,
        uint256 timestamp
    );

    // Constructor
    constructor() Ownable() {}

    /**
     * @dev Menambahkan produk batik baru ke blockchain
     * @param _id ID unik produk
     * @param _productName Nama produk
     * @param _artisanName Nama pengrajin
     * @param _artisanAddress Alamat pengrajin
     * @param _village Nama desa
     * @param _district Kecamatan
     * @param _regency Kabupaten
     * @param _province Provinsi
     * @param _coordinates Koordinat GPS
     * @param _technique Teknik pembuatan
     * @param _materials Bahan yang digunakan
     * @param _description Deskripsi produk
     * @param _imageHash Hash foto produk
     * @param _artisanImageHash Hash foto pengrajin
     * @param _videoHash Hash video proses pembuatan
     */
    function addProduct(
        uint256 _id,
        string memory _productName,
        string memory _artisanName,
        string memory _artisanAddress,
        string memory _village,
        string memory _district,
        string memory _regency,
        string memory _province,
        string memory _coordinates,
        string memory _technique,
        string memory _materials,
        string memory _description,
        string memory _imageHash,
        string memory _artisanImageHash,
        string memory _videoHash
    ) external onlyOwner nonReentrant {
        // Validasi ID belum digunakan
        require(!idExists[_id], "Product ID already exists");
        require(_id > 0, "Product ID must be greater than 0");

        // Validasi input tidak kosong
        require(bytes(_productName).length > 0, "Product name cannot be empty");
        require(bytes(_artisanName).length > 0, "Artisan name cannot be empty");
        require(bytes(_village).length > 0, "Village cannot be empty");

        // Membuat produk baru
        Product memory newProduct = Product({
            id: _id,
            productName: _productName,
            artisanName: _artisanName,
            artisanAddress: _artisanAddress,
            village: _village,
            district: _district,
            regency: _regency,
            province: _province,
            coordinates: _coordinates,
            technique: _technique,
            materials: _materials,
            description: _description,
            imageHash: _imageHash,
            artisanImageHash: _artisanImageHash,
            videoHash: _videoHash,
            mintDate: block.timestamp,
            isVerified: false,
            verifiedBy: address(0)
        });

        // Menyimpan produk
        products[_id] = newProduct;
        productIds.push(_id);
        idExists[_id] = true;

        // Emit event
        emit ProductAdded(_id, _productName, _artisanName, msg.sender);
    }

    /**
     * @dev Mengambil data produk berdasarkan ID
     * @param _id ID produk yang akan diambil
     * @return Product struct dengan semua data produk
     */
    function getProduct(uint256 _id) external view returns (Product memory) {
        require(idExists[_id], "Product does not exist");
        return products[_id];
    }

    /**
     * @dev Memverifikasi produk (hanya owner yang bisa)
     * @param _id ID produk yang akan diverifikasi
     */
    function verifyProduct(uint256 _id) external onlyOwner {
        require(idExists[_id], "Product does not exist");
        require(!products[_id].isVerified, "Product already verified");

        products[_id].isVerified = true;
        products[_id].verifiedBy = msg.sender;

        emit ProductVerified(_id, msg.sender, block.timestamp);
    }

    /**
     * @dev Mengambil jumlah total produk
     * @return Jumlah produk yang terdaftar
     */
    function getTotalProducts() external view returns (uint256) {
        return productIds.length;
    }

    /**
     * @dev Mengambil ID produk berdasarkan index
     * @param _index Index dalam array productIds
     * @return ID produk pada index tersebut
     */
    function getProductIdByIndex(
        uint256 _index
    ) external view returns (uint256) {
        require(_index < productIds.length, "Index out of bounds");
        return productIds[_index];
    }

    /**
     * @dev Memeriksa apakah produk sudah diverifikasi
     * @param _id ID produk
     * @return true jika sudah diverifikasi, false jika belum
     */
    function isProductVerified(uint256 _id) external view returns (bool) {
        require(idExists[_id], "Product does not exist");
        return products[_id].isVerified;
    }

    /**
     * @dev Mengambil informasi dasar produk (untuk optimasi gas)
     * @param _id ID produk
     * @return id ID produk
     * @return productName Nama produk
     * @return artisanName Nama pengrajin
     * @return village Nama desa
     * @return technique Teknik pembuatan
     * @return isVerified Status verifikasi
     */
    function getProductBasicInfo(
        uint256 _id
    )
        external
        view
        returns (
            uint256 id,
            string memory productName,
            string memory artisanName,
            string memory village,
            string memory technique,
            bool isVerified
        )
    {
        require(idExists[_id], "Product does not exist");
        Product memory product = products[_id];

        return (
            product.id,
            product.productName,
            product.artisanName,
            product.village,
            product.technique,
            product.isVerified
        );
    }
}
