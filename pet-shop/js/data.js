/* PAWS & CO. — catalog demo; all products and reviews are illustrative. */
window.Paws = window.Paws || {};
Paws.products = [
  {
    "id": "daily-dog-chicken",
    "name": "Hạt chó vị gà & gạo lứt",
    "category": "food-dog",
    "petType": "dog",
    "brand": "PAWS Daily",
    "price": 185000,
    "originalPrice": 225000,
    "rating": 4.6,
    "reviewCount": 28,
    "images": [
      "assets/images/daily-dog-chicken.svg",
      "assets/images/daily-dog-chicken-angle.svg",
      "assets/images/daily-dog-chicken-detail.svg"
    ],
    "description": "Bữa ăn và phần thưởng dành cho những chiếc đuôi luôn vui. Thiết kế bao bì dễ bảo quản, phù hợp để khám phá thói quen chăm sóc hằng ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 kg",
        "price": 185000,
        "stock": 12
      },
      {
        "id": "v2",
        "label": "2 kg",
        "price": 344000,
        "stock": 5
      }
    ],
    "stock": 17,
    "tags": [
      "bestseller",
      "sale"
    ],
    "createdAt": "2026-10-03"
  },
  {
    "id": "sensitive-dog-salmon",
    "name": "Hạt chó vị cá hồi Sensitive",
    "category": "food-dog",
    "petType": "dog",
    "brand": "PAWS Daily",
    "price": 245000,
    "originalPrice": 245000,
    "rating": 4.7,
    "reviewCount": 45,
    "images": [
      "assets/images/sensitive-dog-salmon.svg",
      "assets/images/sensitive-dog-salmon-angle.svg",
      "assets/images/sensitive-dog-salmon-detail.svg"
    ],
    "description": "Bữa ăn và phần thưởng dành cho những chiếc đuôi luôn vui. Thiết kế bao bì dễ bảo quản, phù hợp để khám phá thói quen chăm sóc hằng ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 kg",
        "price": 245000,
        "stock": 13
      },
      {
        "id": "v2",
        "label": "2 kg",
        "price": 456000,
        "stock": 6
      }
    ],
    "stock": 19,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-04"
  },
  {
    "id": "beef-dog-pate",
    "name": "Pate bò mềm cho chó",
    "category": "food-dog",
    "petType": "dog",
    "brand": "Mellow Pet",
    "price": 45000,
    "originalPrice": 55000,
    "rating": 4.8,
    "reviewCount": 62,
    "images": [
      "assets/images/beef-dog-pate.svg",
      "assets/images/beef-dog-pate-angle.svg",
      "assets/images/beef-dog-pate-detail.svg"
    ],
    "description": "Bữa ăn và phần thưởng dành cho những chiếc đuôi luôn vui. Thiết kế bao bì dễ bảo quản, phù hợp để khám phá thói quen chăm sóc hằng ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 hộp · 85 g",
        "price": 45000,
        "stock": 14
      },
      {
        "id": "v2",
        "label": "Lốc 6 hộp",
        "price": 248000,
        "stock": 7
      }
    ],
    "stock": 21,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-05"
  },
  {
    "id": "dog-training-bites",
    "name": "Bánh thưởng gà Training Bites",
    "category": "food-dog",
    "petType": "dog",
    "brand": "Little Wild",
    "price": 89000,
    "originalPrice": 89000,
    "rating": 4.9,
    "reviewCount": 79,
    "images": [
      "assets/images/dog-training-bites.svg",
      "assets/images/dog-training-bites-angle.svg",
      "assets/images/dog-training-bites-detail.svg"
    ],
    "description": "Bữa ăn và phần thưởng dành cho những chiếc đuôi luôn vui. Thiết kế bao bì dễ bảo quản, phù hợp để khám phá thói quen chăm sóc hằng ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 89000,
        "stock": 15
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 165000,
        "stock": 8
      }
    ],
    "stock": 23,
    "tags": [
      "bestseller"
    ],
    "createdAt": "2026-10-06"
  },
  {
    "id": "indoor-cat-salmon",
    "name": "Hạt mèo Indoor vị cá hồi",
    "category": "food-cat",
    "petType": "cat",
    "brand": "PAWS Daily",
    "price": 215000,
    "originalPrice": 255000,
    "rating": 4.6,
    "reviewCount": 96,
    "images": [
      "assets/images/indoor-cat-salmon.svg",
      "assets/images/indoor-cat-salmon-angle.svg",
      "assets/images/indoor-cat-salmon-detail.svg"
    ],
    "description": "Một lựa chọn cho thực đơn của người bạn nhỏ kén ăn. Kích thước và hương vị được minh họa để bạn thử trải nghiệm lựa chọn sản phẩm. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 kg",
        "price": 215000,
        "stock": 16
      },
      {
        "id": "v2",
        "label": "2 kg",
        "price": 400000,
        "stock": 9
      }
    ],
    "stock": 25,
    "tags": [
      "bestseller",
      "sale"
    ],
    "createdAt": "2026-10-07"
  },
  {
    "id": "kitten-chicken",
    "name": "Hạt mèo con vị gà Kitten",
    "category": "food-cat",
    "petType": "cat",
    "brand": "PAWS Daily",
    "price": 225000,
    "originalPrice": 225000,
    "rating": 4.7,
    "reviewCount": 113,
    "images": [
      "assets/images/kitten-chicken.svg",
      "assets/images/kitten-chicken-angle.svg",
      "assets/images/kitten-chicken-detail.svg"
    ],
    "description": "Một lựa chọn cho thực đơn của người bạn nhỏ kén ăn. Kích thước và hương vị được minh họa để bạn thử trải nghiệm lựa chọn sản phẩm. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 kg",
        "price": 225000,
        "stock": 17
      },
      {
        "id": "v2",
        "label": "2 kg",
        "price": 418000,
        "stock": 5
      }
    ],
    "stock": 22,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-08"
  },
  {
    "id": "cat-tuna-pate",
    "name": "Pate cá ngừ mềm cho mèo",
    "category": "food-cat",
    "petType": "cat",
    "brand": "Mellow Pet",
    "price": 39000,
    "originalPrice": 49000,
    "rating": 4.8,
    "reviewCount": 130,
    "images": [
      "assets/images/cat-tuna-pate.svg",
      "assets/images/cat-tuna-pate-angle.svg",
      "assets/images/cat-tuna-pate-detail.svg"
    ],
    "description": "Một lựa chọn cho thực đơn của người bạn nhỏ kén ăn. Kích thước và hương vị được minh họa để bạn thử trải nghiệm lựa chọn sản phẩm. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "1 hộp · 85 g",
        "price": 39000,
        "stock": 18
      },
      {
        "id": "v2",
        "label": "Lốc 6 hộp",
        "price": 214000,
        "stock": 6
      }
    ],
    "stock": 24,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-09"
  },
  {
    "id": "cat-creamy-treat",
    "name": "Súp thưởng mèo Creamy Tuna",
    "category": "food-cat",
    "petType": "cat",
    "brand": "Little Wild",
    "price": 69000,
    "originalPrice": 69000,
    "rating": 4.9,
    "reviewCount": 147,
    "images": [
      "assets/images/cat-creamy-treat.svg",
      "assets/images/cat-creamy-treat-angle.svg",
      "assets/images/cat-creamy-treat-detail.svg"
    ],
    "description": "Một lựa chọn cho thực đơn của người bạn nhỏ kén ăn. Kích thước và hương vị được minh họa để bạn thử trải nghiệm lựa chọn sản phẩm. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 69000,
        "stock": 19
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 128000,
        "stock": 7
      }
    ],
    "stock": 26,
    "tags": [
      "bestseller"
    ],
    "createdAt": "2026-10-10"
  },
  {
    "id": "rope-twist",
    "name": "Dây thừng chơi Twist",
    "category": "toys",
    "petType": "dog",
    "brand": "Little Wild",
    "price": 95000,
    "originalPrice": 95000,
    "rating": 4.6,
    "reviewCount": 164,
    "images": [
      "assets/images/rope-twist.svg",
      "assets/images/rope-twist-angle.svg",
      "assets/images/rope-twist-detail.svg"
    ],
    "description": "Một chút tò mò, thật nhiều khoảnh khắc bên nhau. Đồ chơi có hình dáng thân thiện để cùng bạn nhỏ vận động và tương tác mỗi ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 95000,
        "stock": 20
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 176000,
        "stock": 8
      }
    ],
    "stock": 28,
    "tags": [
      "bestseller"
    ],
    "createdAt": "2026-10-11"
  },
  {
    "id": "soft-ball",
    "name": "Bóng cao su Soft Bounce",
    "category": "toys",
    "petType": "dog",
    "brand": "Little Wild",
    "price": 79000,
    "originalPrice": 99000,
    "rating": 4.7,
    "reviewCount": 181,
    "images": [
      "assets/images/soft-ball.svg",
      "assets/images/soft-ball-angle.svg",
      "assets/images/soft-ball-detail.svg"
    ],
    "description": "Một chút tò mò, thật nhiều khoảnh khắc bên nhau. Đồ chơi có hình dáng thân thiện để cùng bạn nhỏ vận động và tương tác mỗi ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 79000,
        "stock": 12
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 146000,
        "stock": 9
      }
    ],
    "stock": 21,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-12"
  },
  {
    "id": "cat-wand",
    "name": "Cần câu mèo Feather Fun",
    "category": "toys",
    "petType": "cat",
    "brand": "Little Wild",
    "price": 85000,
    "originalPrice": 85000,
    "rating": 4.8,
    "reviewCount": 198,
    "images": [
      "assets/images/cat-wand.svg",
      "assets/images/cat-wand-angle.svg",
      "assets/images/cat-wand-detail.svg"
    ],
    "description": "Một chút tò mò, thật nhiều khoảnh khắc bên nhau. Đồ chơi có hình dáng thân thiện để cùng bạn nhỏ vận động và tương tác mỗi ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 85000,
        "stock": 13
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 157000,
        "stock": 5
      }
    ],
    "stock": 18,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-13"
  },
  {
    "id": "cat-fish",
    "name": "Cá vải Catnip Fish",
    "category": "toys",
    "petType": "cat",
    "brand": "Mellow Pet",
    "price": 99000,
    "originalPrice": 99000,
    "rating": 4.9,
    "reviewCount": 35,
    "images": [
      "assets/images/cat-fish.svg",
      "assets/images/cat-fish-angle.svg",
      "assets/images/cat-fish-detail.svg"
    ],
    "description": "Một chút tò mò, thật nhiều khoảnh khắc bên nhau. Đồ chơi có hình dáng thân thiện để cùng bạn nhỏ vận động và tương tác mỗi ngày. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 99000,
        "stock": 14
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 183000,
        "stock": 6
      }
    ],
    "stock": 20,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-14"
  },
  {
    "id": "ceramic-bowl",
    "name": "Bát gốm nâng đế Everyday",
    "category": "accessories",
    "petType": "both",
    "brand": "PAWS Living",
    "price": 189000,
    "originalPrice": 229000,
    "rating": 4.6,
    "reviewCount": 52,
    "images": [
      "assets/images/ceramic-bowl.svg",
      "assets/images/ceramic-bowl-angle.svg",
      "assets/images/ceramic-bowl-detail.svg"
    ],
    "description": "Phụ kiện giản dị với màu sắc ấm và những chi tiết chỉn chu. Dành cho nhịp sống thường ngày, từ bữa ăn đến những buổi đi dạo. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 189000,
        "stock": 15
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 350000,
        "stock": 7
      }
    ],
    "stock": 22,
    "tags": [
      "bestseller",
      "sale"
    ],
    "createdAt": "2026-10-15"
  },
  {
    "id": "woven-leash",
    "name": "Dây dắt dệt Walk Together",
    "category": "accessories",
    "petType": "dog",
    "brand": "PAWS Living",
    "price": 245000,
    "originalPrice": 245000,
    "rating": 4.7,
    "reviewCount": 69,
    "images": [
      "assets/images/woven-leash.svg",
      "assets/images/woven-leash-angle.svg",
      "assets/images/woven-leash-detail.svg"
    ],
    "description": "Phụ kiện giản dị với màu sắc ấm và những chi tiết chỉn chu. Dành cho nhịp sống thường ngày, từ bữa ăn đến những buổi đi dạo. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 245000,
        "stock": 16
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 453000,
        "stock": 8
      }
    ],
    "stock": 24,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-16"
  },
  {
    "id": "soft-harness",
    "name": "Yếm dắt Soft Hug",
    "category": "accessories",
    "petType": "dog",
    "brand": "Mellow Pet",
    "price": 285000,
    "originalPrice": 325000,
    "rating": 4.8,
    "reviewCount": 86,
    "images": [
      "assets/images/soft-harness.svg",
      "assets/images/soft-harness-angle.svg",
      "assets/images/soft-harness-detail.svg"
    ],
    "description": "Phụ kiện giản dị với màu sắc ấm và những chi tiết chỉn chu. Dành cho nhịp sống thường ngày, từ bữa ăn đến những buổi đi dạo. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 2–5 kg",
        "price": 285000,
        "stock": 17
      },
      {
        "id": "v2",
        "label": "M · 5–10 kg",
        "price": 314000,
        "stock": 9
      }
    ],
    "stock": 26,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-17"
  },
  {
    "id": "cat-collar",
    "name": "Vòng cổ mèo Breakaway",
    "category": "accessories",
    "petType": "cat",
    "brand": "PAWS Living",
    "price": 119000,
    "originalPrice": 119000,
    "rating": 4.9,
    "reviewCount": 103,
    "images": [
      "assets/images/cat-collar.svg",
      "assets/images/cat-collar-angle.svg",
      "assets/images/cat-collar-detail.svg"
    ],
    "description": "Phụ kiện giản dị với màu sắc ấm và những chi tiết chỉn chu. Dành cho nhịp sống thường ngày, từ bữa ăn đến những buổi đi dạo. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 2–5 kg",
        "price": 119000,
        "stock": 18
      },
      {
        "id": "v2",
        "label": "M · 5–10 kg",
        "price": 131000,
        "stock": 5
      }
    ],
    "stock": 23,
    "tags": [
      "bestseller"
    ],
    "createdAt": "2026-10-18"
  },
  {
    "id": "gentle-shampoo",
    "name": "Sữa tắm Gentle Oat",
    "category": "care",
    "petType": "both",
    "brand": "PAWS Daily",
    "price": 159000,
    "originalPrice": 189000,
    "rating": 4.6,
    "reviewCount": 120,
    "images": [
      "assets/images/gentle-shampoo.svg",
      "assets/images/gentle-shampoo-angle.svg",
      "assets/images/gentle-shampoo-detail.svg"
    ],
    "description": "Biến việc chăm sóc thành khoảng thời gian dịu dàng. Thiết kế dễ cầm, dễ cất, cho góc chăm sóc thú cưng luôn gọn gàng. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "250 ml",
        "price": 159000,
        "stock": 19
      },
      {
        "id": "v2",
        "label": "500 ml",
        "price": 270000,
        "stock": 6
      }
    ],
    "stock": 25,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-19"
  },
  {
    "id": "soft-brush",
    "name": "Lược chải lông Soft Touch",
    "category": "care",
    "petType": "both",
    "brand": "PAWS Living",
    "price": 135000,
    "originalPrice": 135000,
    "rating": 4.7,
    "reviewCount": 137,
    "images": [
      "assets/images/soft-brush.svg",
      "assets/images/soft-brush-angle.svg",
      "assets/images/soft-brush-detail.svg"
    ],
    "description": "Biến việc chăm sóc thành khoảng thời gian dịu dàng. Thiết kế dễ cầm, dễ cất, cho góc chăm sóc thú cưng luôn gọn gàng. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 135000,
        "stock": 20
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 250000,
        "stock": 7
      }
    ],
    "stock": 27,
    "tags": [
      "bestseller"
    ],
    "createdAt": "2026-10-20"
  },
  {
    "id": "dental-care",
    "name": "Bộ chăm sóc răng Smile",
    "category": "care",
    "petType": "dog",
    "brand": "PAWS Daily",
    "price": 149000,
    "originalPrice": 149000,
    "rating": 4.8,
    "reviewCount": 154,
    "images": [
      "assets/images/dental-care.svg",
      "assets/images/dental-care-angle.svg",
      "assets/images/dental-care-detail.svg"
    ],
    "description": "Biến việc chăm sóc thành khoảng thời gian dịu dàng. Thiết kế dễ cầm, dễ cất, cho góc chăm sóc thú cưng luôn gọn gàng. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 149000,
        "stock": 12
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 276000,
        "stock": 8
      }
    ],
    "stock": 20,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-21"
  },
  {
    "id": "pet-wipes",
    "name": "Khăn lau thú cưng Clean Paws",
    "category": "care",
    "petType": "both",
    "brand": "Mellow Pet",
    "price": 79000,
    "originalPrice": 95000,
    "rating": 4.9,
    "reviewCount": 171,
    "images": [
      "assets/images/pet-wipes.svg",
      "assets/images/pet-wipes-angle.svg",
      "assets/images/pet-wipes-detail.svg"
    ],
    "description": "Biến việc chăm sóc thành khoảng thời gian dịu dàng. Thiết kế dễ cầm, dễ cất, cho góc chăm sóc thú cưng luôn gọn gàng. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "Tiêu chuẩn",
        "price": 79000,
        "stock": 13
      },
      {
        "id": "v2",
        "label": "Bộ đôi",
        "price": 146000,
        "stock": 9
      }
    ],
    "stock": 22,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-22"
  },
  {
    "id": "cloud-donut",
    "name": "Đệm tròn Cloud Donut",
    "category": "beds",
    "petType": "both",
    "brand": "PAWS Living",
    "price": 459000,
    "originalPrice": 559000,
    "rating": 4.6,
    "reviewCount": 188,
    "images": [
      "assets/images/cloud-donut.svg",
      "assets/images/cloud-donut-angle.svg",
      "assets/images/cloud-donut-detail.svg"
    ],
    "description": "Một góc êm ái để nằm dài, cuộn tròn và mơ những giấc mơ nhỏ. Tông màu trung tính hài hòa với không gian sống của bạn. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 45 cm",
        "price": 459000,
        "stock": 14
      },
      {
        "id": "v2",
        "label": "M · 60 cm",
        "price": 597000,
        "stock": 5
      }
    ],
    "stock": 19,
    "tags": [
      "bestseller",
      "sale"
    ],
    "createdAt": "2026-10-23"
  },
  {
    "id": "linen-bed",
    "name": "Giường Linen Nest",
    "category": "beds",
    "petType": "dog",
    "brand": "PAWS Living",
    "price": 685000,
    "originalPrice": 685000,
    "rating": 4.7,
    "reviewCount": 205,
    "images": [
      "assets/images/linen-bed.svg",
      "assets/images/linen-bed-angle.svg",
      "assets/images/linen-bed-detail.svg"
    ],
    "description": "Một góc êm ái để nằm dài, cuộn tròn và mơ những giấc mơ nhỏ. Tông màu trung tính hài hòa với không gian sống của bạn. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 45 cm",
        "price": 685000,
        "stock": 15
      },
      {
        "id": "v2",
        "label": "M · 60 cm",
        "price": 890000,
        "stock": 6
      }
    ],
    "stock": 21,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-23"
  },
  {
    "id": "cat-cave",
    "name": "Nhà mèo Cozy Cave",
    "category": "beds",
    "petType": "cat",
    "brand": "Mellow Pet",
    "price": 525000,
    "originalPrice": 525000,
    "rating": 4.8,
    "reviewCount": 42,
    "images": [
      "assets/images/cat-cave.svg",
      "assets/images/cat-cave-angle.svg",
      "assets/images/cat-cave-detail.svg"
    ],
    "description": "Một góc êm ái để nằm dài, cuộn tròn và mơ những giấc mơ nhỏ. Tông màu trung tính hài hòa với không gian sống của bạn. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 45 cm",
        "price": 525000,
        "stock": 16
      },
      {
        "id": "v2",
        "label": "M · 60 cm",
        "price": 682000,
        "stock": 7
      }
    ],
    "stock": 23,
    "tags": [
      "new"
    ],
    "createdAt": "2026-10-23"
  },
  {
    "id": "waffle-blanket",
    "name": "Chăn dệt Waffle Cuddle",
    "category": "beds",
    "petType": "both",
    "brand": "PAWS Living",
    "price": 269000,
    "originalPrice": 329000,
    "rating": 4.9,
    "reviewCount": 59,
    "images": [
      "assets/images/waffle-blanket.svg",
      "assets/images/waffle-blanket-angle.svg",
      "assets/images/waffle-blanket-detail.svg"
    ],
    "description": "Một góc êm ái để nằm dài, cuộn tròn và mơ những giấc mơ nhỏ. Tông màu trung tính hài hòa với không gian sống của bạn. Đây là sản phẩm demo, hình ảnh là minh họa thiết kế; không đại diện hàng hóa đang bán.",
    "variants": [
      {
        "id": "v1",
        "label": "S · 45 cm",
        "price": 269000,
        "stock": 17
      },
      {
        "id": "v2",
        "label": "M · 60 cm",
        "price": 350000,
        "stock": 8
      }
    ],
    "stock": 25,
    "tags": [
      "sale"
    ],
    "createdAt": "2026-10-23"
  }
];
Paws.categories = [
  {
    "id": "food-dog",
    "name": "Thức ăn cho chó",
    "image": "assets/images/daily-dog-chicken.svg",
    "description": "Dinh dưỡng cho mỗi ngày vui"
  },
  {
    "id": "food-cat",
    "name": "Thức ăn cho mèo",
    "image": "assets/images/indoor-cat-salmon.svg",
    "description": "Chiều lòng những bạn nhỏ kén ăn"
  },
  {
    "id": "toys",
    "name": "Đồ chơi",
    "image": "assets/images/rope-twist.svg",
    "description": "Bắt đầu một cuộc vui"
  },
  {
    "id": "accessories",
    "name": "Phụ kiện",
    "image": "assets/images/ceramic-bowl.svg",
    "description": "Những chi tiết đầy yêu thương"
  },
  {
    "id": "care",
    "name": "Vệ sinh & chăm sóc",
    "image": "assets/images/gentle-shampoo.svg",
    "description": "Chăm chút từ điều nhỏ nhất"
  },
  {
    "id": "beds",
    "name": "Giường & nhà",
    "image": "assets/images/cloud-donut.svg",
    "description": "Một góc ngủ thật êm"
  }
];
Paws.productById = function (id) { return Paws.products.find(function (product) { return product.id === String(id); }); };
