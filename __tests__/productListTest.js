import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('Product API', () => {
  const productData = {
    products: [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: [
          "beauty",
          "mascara"
        ],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: {
          width: 23.17,
          height: 14.43,
          depth: 28.01
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
          {
            rating: 2,
            comment: "Very unhappy with my purchase!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "John Doe",
            reviewerEmail: "john.doe@x.dummyjson.com"
          },
          {
            rating: 2,
            comment: "Not as described!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Nolan Gonzalez",
            reviewerEmail: "nolan.gonzalez@x.dummyjson.com"
          },
          {
            rating: 5,
            comment: "Very satisfied!",
            date: "2024-05-23T08:56:21.618Z",
            reviewerName: "Scarlett Wright",
            reviewerEmail: "scarlett.wright@x.dummyjson.com"
          }
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        meta: {
          createdAt: "2024-05-23T08:56:21.618Z",
          updatedAt: "2024-05-23T08:56:21.618Z",
          barcode: "9164035109868",
          qrCode: "https://assets.dummyjson.com/public/qr-code.png"
        },
        images: [
          "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
        ],
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
      }
    ]
  };

  beforeEach(() => {
    mock.onGet('https://dummyjson.com/products').reply(200, productData);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return product data from the API', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    
    expect(response.status).toBe(200);
    expect(response.data).toEqual(productData);
  });

  it('should contain the correct product details', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    const product = response.data.products[0];

    expect(product).toHaveProperty('id', 1);
    expect(product).toHaveProperty('title', 'Essence Mascara Lash Princess');
    expect(product).toHaveProperty('category', 'beauty');
    expect(product).toHaveProperty('price', 9.99);
    expect(product).toHaveProperty('rating', 4.94);
    expect(product).toHaveProperty('stock', 5);
    expect(product).toHaveProperty('tags');
    expect(product.tags).toEqual(expect.arrayContaining(["beauty", "mascara"]));
    expect(product).toHaveProperty('brand', 'Essence');
    expect(product).toHaveProperty('sku', 'RCH45Q1A');
  });

  it('should contain reviews with correct data', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    const reviews = response.data.products[0].reviews;

    expect(reviews).toHaveLength(3);

    expect(reviews[0]).toHaveProperty('rating', 2);
    expect(reviews[0]).toHaveProperty('comment', 'Very unhappy with my purchase!');
    expect(reviews[0]).toHaveProperty('reviewerName', 'John Doe');
  });

  it('should return product image URLs', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    const images = response.data.products[0].images;

    expect(images).toHaveLength(1);
    expect(images[0]).toBe("https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png");
  });

  it('should return the correct availability status', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    const availabilityStatus = response.data.products[0].availabilityStatus;

    expect(availabilityStatus).toBe("Low Stock");
  });
});
