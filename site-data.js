// Trunklii — Site Data
// CMSで編集してエクスポートし、このファイルを上書きするだけでサイトに反映されます
window.SITE_DATA = {
  "global": {
    "brandName": "Trunklii",
    "copyright": "© 2026 Trunklii. All rights reserved."
  },
  "studios": {
    "et": {
      "key": "et",
      "simulator": {
        "enabled": true,
        "intro": "753の撮影について、いくつかお伺いします。概算のお見積りをご案内します。",
        "questions": [
          {
            "id": "q1",
            "label": "カット数をお選びください",
            "type": "single",
            "options": [
              {
                "id": "c50",
                "label": "Family plan（50カット）"
              },
              {
                "id": "c20",
                "label": "One plan（20カット）"
              }
            ],
            "showIf": []
          },
          {
            "id": "q2",
            "label": "着物レンタルを利用しますか",
            "note": "スタジオの一点物の着物からお選びいただけます。\n持ち込みも可能です（**追加料金なし**）。",
            "type": "single",
            "options": [
              {
                "id": "y",
                "label": "はい"
              },
              {
                "id": "n",
                "label": "いいえ（お持ち込み）"
              }
            ],
            "showIf": []
          },
          {
            "id": "q3",
            "label": "着付けの追加人数（ご本人以外）",
            "type": "number",
            "unit": "人",
            "min": 0,
            "max": 6,
            "showIf": [
              {
                "q": "q2",
                "op": "eq",
                "val": "y"
              }
            ]
          },
          {
            "id": "q4",
            "label": "出張撮影（神社）をご希望ですか",
            "type": "single",
            "options": [
              {
                "id": "y",
                "label": "はい"
              },
              {
                "id": "n",
                "label": "いいえ"
              }
            ],
            "showIf": []
          },
          {
            "id": "q5",
            "label": "兄弟同時撮影の人数",
            "type": "number",
            "unit": "人",
            "min": 0,
            "max": 5,
            "showIf": []
          },
          {
            "id": "q6",
            "label": "アルバムを付けますか",
            "type": "single",
            "options": [
              {
                "id": "y",
                "label": "はい"
              },
              {
                "id": "n",
                "label": "いいえ"
              }
            ],
            "showIf": []
          },
          {
            "id": "q7",
            "label": "撮影時期",
            "type": "single",
            "options": [
              {
                "id": "weekday",
                "label": "平日"
              },
              {
                "id": "weekend",
                "label": "土日祝"
              },
              {
                "id": "peak",
                "label": "753ピーク（9〜11月）"
              }
            ],
            "showIf": []
          },
          {
            "id": "q8",
            "label": "データ追加の枚数",
            "type": "number",
            "unit": "枚",
            "min": 0,
            "max": 30,
            "showIf": []
          }
        ],
        "rules": [
          {
            "id": "r1",
            "label": "基本料金（50カット）",
            "effect": "base",
            "amount": 77000,
            "from": false,
            "when": [
              {
                "q": "q1",
                "op": "eq",
                "val": "c50"
              }
            ]
          },
          {
            "id": "r2",
            "label": "基本料金（20カット）",
            "effect": "base",
            "amount": 55000,
            "from": false,
            "when": [
              {
                "q": "q1",
                "op": "eq",
                "val": "c20"
              }
            ]
          },
          {
            "id": "r3",
            "label": "着付け追加",
            "effect": "perUnit",
            "amount": 5500,
            "per": "q3",
            "from": true,
            "when": []
          },
          {
            "id": "r4",
            "label": "出張撮影（神社）",
            "effect": "add",
            "amount": 22000,
            "from": true,
            "when": [
              {
                "q": "q4",
                "op": "eq",
                "val": "y"
              }
            ]
          },
          {
            "id": "r5",
            "label": "兄弟同時撮影",
            "effect": "perUnit",
            "amount": 11000,
            "per": "q5",
            "from": true,
            "when": []
          },
          {
            "id": "r6",
            "label": "アルバム",
            "effect": "add",
            "amount": 22000,
            "from": true,
            "when": [
              {
                "q": "q6",
                "op": "eq",
                "val": "y"
              }
            ]
          },
          {
            "id": "r7",
            "label": "データ追加",
            "effect": "perUnit",
            "amount": 1100,
            "per": "q8",
            "from": false,
            "when": []
          },
          {
            "id": "r8",
            "label": "セット割（出張＋アルバム）",
            "effect": "discount",
            "amount": 5000,
            "from": false,
            "when": [
              {
                "q": "q4",
                "op": "eq",
                "val": "y"
              },
              {
                "q": "q6",
                "op": "eq",
                "val": "y"
              }
            ]
          },
          {
            "id": "r9",
            "label": "土日祝",
            "effect": "add",
            "amount": 5000,
            "from": false,
            "when": [
              {
                "q": "q7",
                "op": "eq",
                "val": "weekend"
              }
            ]
          },
          {
            "id": "r10",
            "label": "753ピーク",
            "effect": "add",
            "amount": 10000,
            "from": false,
            "when": [
              {
                "q": "q7",
                "op": "eq",
                "val": "peak"
              }
            ]
          }
        ]
      },
      "name": "Studio et.",
      "shortName": "et.",
      "tagline": "I wish you have a healthy life filled with happiness",
      "description": "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、753・お宮参り・バースデーなど\n大切な記念日を美しい写真に残します。",
      "accentColor": "#b8935a",
      "address": "〒501-6253 岐阜県羽島市小熊町島新道76-9 2階",
      "tel": "050-1751-2601",
      "hours": "受付 9:00–17:00 ／ 撮影 9:00–18:00（水・木曜定休）",
      "instagram": "https://www.instagram.com/studio_et._/",
      "instagramHandle": "@studio_et._",
      "mapUrl": "https://goo.gl/maps/ZVSCkidKRbLqAvU19",
      "bookingUrl": "https://studio-et.stores.jp/reserve/hashima/733693",
      "bookingLabel": "予約する",
      "comingSoon": false,
      "heroImages": [
        {
          "file": "studio-et-hashima-hero-pc-01.jpg",
          "alt": "Studio et. hero（PC） 2",
          "logoPos": "tl"
        },
        {
          "file": "studio-et-hashima-hero-pc-02.jpg",
          "alt": "Studio et. hero（PC） 3",
          "logoPos": "cl"
        },
        {
          "file": "studio-et-hashima-hero-pc-03.jpg",
          "alt": "Studio et. hero（PC） 4",
          "logoPos": "cl"
        },
        {
          "file": "studio-et-hashima-hero-pc-04.jpg",
          "alt": "Studio et. hero（PC） 5",
          "logoPos": "tl"
        },
        {
          "file": "studio-et-hashima-hero-pc-05.jpg",
          "alt": "Studio et. hero（PC） 6",
          "logoPos": "cr"
        },
        {
          "file": "studio-et-hashima-hero-pc-06.jpg",
          "alt": "Studio et. hero（PC） 7",
          "logoPos": "bl"
        },
        {
          "file": "studio-et-hashima-hero-pc-07.jpg",
          "alt": "Studio et. hero（PC） 1",
          "logoPos": "tc"
        }
      ],
      "heroImagesSp": [
        {
          "file": "studio-et-hashima-hero-sp-01.jpg",
          "alt": "Studio et. hero（スマホ） 2",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-02.jpg",
          "alt": "Studio et. hero（スマホ） 3",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-03.jpg",
          "alt": "Studio et. hero（スマホ） 4",
          "logoPos": "c"
        },
        {
          "file": "studio-et-hashima-hero-sp-04.jpg",
          "alt": "Studio et. hero（スマホ） 5",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-05.jpg",
          "alt": "Studio et. hero（スマホ） 6",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-06.jpg",
          "alt": "Studio et. hero（スマホ） 7",
          "logoPos": "c"
        },
        {
          "file": "studio-et-hashima-hero-sp-07.jpg",
          "alt": "Studio et. hero（スマホ） 8",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-08.jpg",
          "alt": "Studio et. hero（スマホ） 9",
          "logoPos": "c"
        },
        {
          "file": "studio-et-hashima-hero-sp-09.jpg",
          "alt": "Studio et. hero（スマホ） 10",
          "logoPos": "tc"
        },
        {
          "file": "studio-et-hashima-hero-sp-10.jpg",
          "alt": "Studio et. hero（スマホ） 11",
          "logoPos": "c"
        },
        {
          "file": "studio-et-hashima-hero-sp-11.jpg",
          "alt": "Studio et. hero（スマホ） 1",
          "logoPos": "tc"
        }
      ],
      "about": {
        "image": "about-studio-et-hashima.jpg",
        "heading": "About Studio et.",
        "body": "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、753・お宮参り・バースデーなど\n大切な記念日を美しい写真に残します。\n\n衣装・ヘアメイクから撮影まで、すべてスタジオでご用意しております。\n生花を使用したヘアアレンジや空間装飾で、トータルコーディネートをご提供します。"
      },
      "gallery": [
        {
          "no": "0812",
          "file": "g/shichigosan-girl-family-studio-et-hashima-01.jpg",
          "caption": "753",
          "date": "2026.07.27",
          "ar": 0.6667,
          "tags": [
            "family",
            "753",
            "753girl"
          ]
        },
        {
          "no": "0807",
          "file": "g/shichigosan-girl-studio-et-hashima-01.jpg",
          "caption": "753",
          "date": "2026.07.22",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0805",
          "file": "g/half-birthday-studio-et-hashima-01.jpg",
          "caption": "1/2バースデー",
          "date": "2026.07.21",
          "ar": 1.2491,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0806",
          "file": "g/half-birthday-studio-et-hashima-02.jpg",
          "caption": "1/2バースデー",
          "date": "2026.07.21",
          "ar": 1.2491,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0801",
          "file": "g/shichigosan-girl-studio-et-hashima-02.jpg",
          "caption": "753",
          "date": "2026.07.07",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0798",
          "file": "g/shichigosan-girl-family-studio-et-hashima-02.jpg",
          "caption": "753",
          "date": "2026.07.05",
          "ar": 0.6667,
          "tags": [
            "753",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0799",
          "file": "g/shichigosan-girl-family-studio-et-hashima-03.jpg",
          "caption": "753",
          "date": "2026.07.05",
          "ar": 0.6667,
          "tags": [
            "753",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0794",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-01.jpg",
          "caption": "753",
          "date": "2026.06.29",
          "ar": 1.25,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0795",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-02.jpg",
          "caption": "753",
          "date": "2026.06.29",
          "ar": 1.2491,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0796",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-03.jpg",
          "caption": "753",
          "date": "2026.06.29",
          "ar": 1.2491,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0790",
          "file": "g/shichigosan-girl-studio-et-hashima-03.jpg",
          "caption": "753",
          "date": "2026.06.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0792",
          "file": "g/shichigosan-girl-studio-et-hashima-04.jpg",
          "caption": "753",
          "date": "2026.06.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0787",
          "file": "g/shichigosan-girl-studio-et-hashima-05.jpg",
          "caption": "753",
          "date": "2026.06.21",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0784",
          "file": "g/shichigosan-girl-studio-et-hashima-06.jpg",
          "caption": "753",
          "date": "2026.06.20",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0781",
          "file": "g/shichigosan-boy-studio-et-hashima-01.jpg",
          "caption": "753",
          "date": "2026.06.13",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0782",
          "file": "g/shichigosan-boy-studio-et-hashima-02.jpg",
          "caption": "753",
          "date": "2026.06.13",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0779",
          "file": "g/maternity-family-studio-et-hashima-01.jpg",
          "caption": "マタニティ",
          "date": "2026.06.10",
          "ar": 0.6667,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0778",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-04.jpg",
          "caption": "753",
          "date": "2026.06.07",
          "ar": 1.2504,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0776",
          "file": "g/school-entrance-family-studio-et-hashima-01.jpg",
          "caption": "バースデー",
          "date": "2026.06.01",
          "ar": 1.25,
          "tags": [
            "family",
            "birthday",
            "school"
          ]
        },
        {
          "no": "0772",
          "file": "g/half-birthday-studio-et-hashima-03.jpg",
          "caption": "1/2バースデー",
          "date": "2026.05.27",
          "ar": 1.25,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0767",
          "file": "g/shichigosan-girl-studio-et-hashima-07.jpg",
          "caption": "753",
          "date": "2026.05.22",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0769",
          "file": "g/shichigosan-girl-studio-et-hashima-08.jpg",
          "caption": "753",
          "date": "2026.05.22",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0761",
          "file": "g/birthday-studio-et-hashima-01.jpg",
          "caption": "バースデー",
          "date": "2026.05.19",
          "ar": 1.25,
          "tags": [
            "birthday",
            "event"
          ]
        },
        {
          "no": "0762",
          "file": "g/birthday-studio-et-hashima-02.jpg",
          "caption": "バースデー",
          "date": "2026.05.19",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "event"
          ]
        },
        {
          "no": "0758",
          "file": "g/shichigosan-boy-studio-et-hashima-03.jpg",
          "caption": "753",
          "date": "2026.05.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0760",
          "file": "g/shichigosan-boy-studio-et-hashima-04.jpg",
          "caption": "753",
          "date": "2026.05.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0755",
          "file": "g/half-birthday-studio-et-hashima-04.jpg",
          "caption": "1/2バースデー",
          "date": "2026.05.08",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0756",
          "file": "g/half-birthday-studio-et-hashima-05.jpg",
          "caption": "1/2バースデー",
          "date": "2026.05.08",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0752",
          "file": "g/shichigosan-girl-studio-et-hashima-09.jpg",
          "caption": "753",
          "date": "2026.05.04",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0753",
          "file": "g/shichigosan-girl-studio-et-hashima-10.jpg",
          "caption": "753",
          "date": "2026.05.04",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0749",
          "file": "g/birthday-studio-et-hashima-03.jpg",
          "caption": "バースデー",
          "date": "2026.04.30",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "event"
          ]
        },
        {
          "no": "0750",
          "file": "g/birthday-studio-et-hashima-04.jpg",
          "caption": "バースデー",
          "date": "2026.04.30",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "event"
          ]
        },
        {
          "no": "0743",
          "file": "g/shichigosan-girl-studio-et-hashima-11.jpg",
          "caption": "753",
          "date": "2026.04.23",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0744",
          "file": "g/shichigosan-girl-studio-et-hashima-12.jpg",
          "caption": "753",
          "date": "2026.04.23",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0738",
          "file": "g/shichigosan-girl-studio-et-hashima-13.jpg",
          "caption": "753",
          "date": "2026.04.14",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0733",
          "file": "g/shichigosan-girl-studio-et-hashima-14.jpg",
          "caption": "753",
          "date": "2026.04.09",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0729",
          "file": "g/photo-studio-et-hashima-01.jpg",
          "caption": "Photo",
          "date": "2026.04.07",
          "ar": 1.25,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0731",
          "file": "g/birthday-studio-et-hashima-05.jpg",
          "caption": "バースデー",
          "date": "2026.04.07",
          "ar": 1.2491,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0727",
          "file": "g/shichigosan-girl-studio-et-hashima-15.jpg",
          "caption": "753",
          "date": "2026.04.02",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0722",
          "file": "g/shichigosan-girl-studio-et-hashima-16.jpg",
          "caption": "753",
          "date": "2026.03.30",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0723",
          "file": "g/shichigosan-girl-studio-et-hashima-17.jpg",
          "caption": "753",
          "date": "2026.03.30",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0717",
          "file": "g/half-birthday-studio-et-hashima-06.jpg",
          "caption": "1/2バースデー",
          "date": "2026.03.21",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0718",
          "file": "g/half-birthday-studio-et-hashima-07.jpg",
          "caption": "1/2バースデー",
          "date": "2026.03.21",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0719",
          "file": "g/half-birthday-studio-et-hashima-08.jpg",
          "caption": "1/2バースデー",
          "date": "2026.03.21",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0714",
          "file": "g/birthday-family-studio-et-hashima-01.jpg",
          "caption": "バースデー",
          "date": "2026.03.19",
          "ar": 1.25,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0715",
          "file": "g/birthday-family-studio-et-hashima-02.jpg",
          "caption": "バースデー",
          "date": "2026.03.19",
          "ar": 1.25,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0711",
          "file": "g/shichigosan-boy-studio-et-hashima-05.jpg",
          "caption": "753",
          "date": "2026.03.17",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0712",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-05.jpg",
          "caption": "753",
          "date": "2026.03.17",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0708",
          "file": "g/school-entrance-studio-et-hashima-01.jpg",
          "caption": "入園・入学",
          "date": "2026.03.15",
          "ar": 0.6681,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0709",
          "file": "g/school-entrance-studio-et-hashima-02.jpg",
          "caption": "入園・入学",
          "date": "2026.03.15",
          "ar": 0.6681,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0706",
          "file": "g/shichigosan-girl-studio-et-hashima-18.jpg",
          "caption": "753",
          "date": "2026.03.13",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0700",
          "file": "g/half-coming-of-age-studio-et-hashima-01.jpg",
          "caption": "1/2成人式",
          "date": "2026.03.12",
          "ar": 1.2491,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0701",
          "file": "g/half-coming-of-age-studio-et-hashima-02.jpg",
          "caption": "1/2成人式",
          "date": "2026.03.12",
          "ar": 1.2491,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0702",
          "file": "g/half-coming-of-age-studio-et-hashima-03.jpg",
          "caption": "1/2成人式",
          "date": "2026.03.12",
          "ar": 1.25,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0697",
          "file": "g/half-birthday-studio-et-hashima-09.jpg",
          "caption": "1/2バースデー",
          "date": "2026.03.10",
          "ar": 1.2491,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0698",
          "file": "g/half-birthday-studio-et-hashima-10.jpg",
          "caption": "1/2バースデー",
          "date": "2026.03.10",
          "ar": 1.25,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0693",
          "file": "g/maternity-family-studio-et-hashima-02.jpg",
          "caption": "マタニティ",
          "date": "2026.03.03",
          "ar": 1.2491,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0694",
          "file": "g/maternity-family-studio-et-hashima-03.jpg",
          "caption": "マタニティ",
          "date": "2026.03.03",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0690",
          "file": "g/shichigosan-girl-studio-et-hashima-19.jpg",
          "caption": "753",
          "date": "2026.03.02",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0685",
          "file": "g/shichigosan-girl-studio-et-hashima-20.jpg",
          "caption": "753",
          "date": "2026.03.01",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0686",
          "file": "g/shichigosan-girl-studio-et-hashima-21.jpg",
          "caption": "753",
          "date": "2026.03.01",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0680",
          "file": "g/half-birthday-studio-et-hashima-11.jpg",
          "caption": "1/2バースデー",
          "date": "2026.02.24",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0681",
          "file": "g/half-birthday-studio-et-hashima-12.jpg",
          "caption": "1/2バースデー",
          "date": "2026.02.24",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0677",
          "file": "g/maternity-family-studio-et-hashima-04.jpg",
          "caption": "マタニティ",
          "date": "2026.02.12",
          "ar": 1.2491,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0678",
          "file": "g/maternity-family-studio-et-hashima-05.jpg",
          "caption": "マタニティ",
          "date": "2026.02.12",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0673",
          "file": "g/birthday-family-studio-et-hashima-03.jpg",
          "caption": "バースデー",
          "date": "2026.02.05",
          "ar": 1.25,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0674",
          "file": "g/birthday-family-studio-et-hashima-04.jpg",
          "caption": "バースデー",
          "date": "2026.02.05",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0671",
          "file": "g/birthday-studio-et-hashima-06.jpg",
          "caption": "バースデー",
          "date": "2026.02.01",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0668",
          "file": "g/shichigosan-girl-family-studio-et-hashima-04.jpg",
          "caption": "753",
          "date": "2026.01.31",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0665",
          "file": "g/shichigosan-girl-family-studio-et-hashima-05.jpg",
          "caption": "753",
          "date": "2026.01.30",
          "ar": 0.6681,
          "tags": [
            "753",
            "753girl",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0666",
          "file": "g/shichigosan-girl-family-studio-et-hashima-06.jpg",
          "caption": "753",
          "date": "2026.01.30",
          "ar": 0.6681,
          "tags": [
            "753",
            "753girl",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0662",
          "file": "g/maternity-studio-et-hashima-01.jpg",
          "caption": "マタニティ",
          "date": "2026.01.29",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0663",
          "file": "g/maternity-family-studio-et-hashima-06.jpg",
          "caption": "マタニティ",
          "date": "2026.01.29",
          "ar": 1.2491,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0659",
          "file": "g/shichigosan-girl-studio-et-hashima-22.jpg",
          "caption": "753",
          "date": "2026.01.28",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0657",
          "file": "g/shichigosan-girl-studio-et-hashima-23.jpg",
          "caption": "753",
          "date": "2026.01.26",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0658",
          "file": "g/shichigosan-girl-studio-et-hashima-24.jpg",
          "caption": "753",
          "date": "2026.01.26",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0649",
          "file": "g/shichigosan-girl-studio-et-hashima-25.jpg",
          "caption": "753",
          "date": "2026.01.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0650",
          "file": "g/shichigosan-girl-studio-et-hashima-26.jpg",
          "caption": "753",
          "date": "2026.01.05",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0645",
          "file": "g/shichigosan-girl-studio-et-hashima-27.jpg",
          "caption": "753",
          "date": "2026.01.02",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0646",
          "file": "g/shichigosan-girl-studio-et-hashima-28.jpg",
          "caption": "753",
          "date": "2026.01.02",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0642",
          "file": "g/half-birthday-studio-et-hashima-13.jpg",
          "caption": "1/2バースデー",
          "date": "2025.12.23",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0643",
          "file": "g/half-birthday-studio-et-hashima-14.jpg",
          "caption": "1/2バースデー",
          "date": "2025.12.23",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0638",
          "file": "g/shichigosan-girl-studio-et-hashima-29.jpg",
          "caption": "753",
          "date": "2025.12.13",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0639",
          "file": "g/shichigosan-girl-studio-et-hashima-30.jpg",
          "caption": "753",
          "date": "2025.12.13",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0634",
          "file": "g/birthday-family-studio-et-hashima-05.jpg",
          "caption": "バースデー",
          "date": "2025.12.05",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0635",
          "file": "g/birthday-family-studio-et-hashima-06.jpg",
          "caption": "バースデー",
          "date": "2025.12.05",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "family"
          ]
        },
        {
          "no": "0632",
          "file": "g/shichigosan-girl-studio-et-hashima-31.jpg",
          "caption": "753",
          "date": "2025.12.01",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0628",
          "file": "g/shichigosan-girl-studio-et-hashima-32.jpg",
          "caption": "753",
          "date": "2025.11.29",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0629",
          "file": "g/shichigosan-girl-studio-et-hashima-33.jpg",
          "caption": "753",
          "date": "2025.11.29",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0625",
          "file": "g/maternity-studio-et-hashima-02.jpg",
          "caption": "マタニティ",
          "date": "2025.11.28",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0626",
          "file": "g/maternity-family-studio-et-hashima-07.jpg",
          "caption": "マタニティ",
          "date": "2025.11.28",
          "ar": 1.2491,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0624",
          "file": "g/maternity-family-studio-et-hashima-08.jpg",
          "caption": "マタニティ",
          "date": "2025.11.24",
          "ar": 1.2491,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0623",
          "file": "g/half-birthday-family-studio-et-hashima-01.jpg",
          "caption": "1/2バースデー",
          "date": "2025.11.23",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "halfbd",
            "family"
          ]
        },
        {
          "no": "0622",
          "file": "g/half-birthday-studio-et-hashima-15.jpg",
          "caption": "1/2バースデー",
          "date": "2025.11.21",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0618",
          "file": "g/omiyamairi-newborn-studio-et-hashima-01.jpg",
          "caption": "お宮参り",
          "date": "2025.11.15",
          "ar": 0.6667,
          "tags": [
            "100days",
            "omiyamairi"
          ]
        },
        {
          "no": "0619",
          "file": "g/omiyamairi-newborn-studio-et-hashima-02.jpg",
          "caption": "お宮参り",
          "date": "2025.11.15",
          "ar": 0.6667,
          "tags": [
            "100days",
            "omiyamairi"
          ]
        },
        {
          "no": "0620",
          "file": "g/omiyamairi-newborn-studio-et-hashima-03.jpg",
          "caption": "お宮参り",
          "date": "2025.11.15",
          "ar": 0.6667,
          "tags": [
            "100days",
            "omiyamairi"
          ]
        },
        {
          "no": "0614",
          "file": "g/half-birthday-family-studio-et-hashima-02.jpg",
          "caption": "1/2バースデー",
          "date": "2025.11.14",
          "ar": 0.6667,
          "tags": [
            "family",
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0615",
          "file": "g/half-birthday-family-studio-et-hashima-03.jpg",
          "caption": "1/2バースデー",
          "date": "2025.11.14",
          "ar": 0.6667,
          "tags": [
            "family",
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0616",
          "file": "g/half-birthday-family-studio-et-hashima-04.jpg",
          "caption": "1/2バースデー",
          "date": "2025.11.14",
          "ar": 0.6667,
          "tags": [
            "family",
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0611",
          "file": "g/shichigosan-girl-studio-et-hashima-34.jpg",
          "caption": "753",
          "date": "2025.11.10",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0608",
          "file": "g/shichigosan-girl-family-studio-et-hashima-07.jpg",
          "caption": "753",
          "date": "2025.11.02",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0609",
          "file": "g/shichigosan-girl-family-studio-et-hashima-08.jpg",
          "caption": "753",
          "date": "2025.11.02",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0604",
          "file": "g/shichigosan-girl-studio-et-hashima-35.jpg",
          "caption": "753",
          "date": "2025.11.01",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0601",
          "file": "g/birthday-studio-et-hashima-07.jpg",
          "caption": "バースデー",
          "date": "2025.10.31",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0602",
          "file": "g/birthday-studio-et-hashima-08.jpg",
          "caption": "バースデー",
          "date": "2025.10.31",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0598",
          "file": "g/shichigosan-girl-studio-et-hashima-36.jpg",
          "caption": "753",
          "date": "2025.10.28",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0594",
          "file": "g/shichigosan-boy-studio-et-hashima-06.jpg",
          "caption": "753",
          "date": "2025.10.23",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0595",
          "file": "g/shichigosan-boy-studio-et-hashima-07.jpg",
          "caption": "753",
          "date": "2025.10.23",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0593",
          "file": "g/half-birthday-studio-et-hashima-16.jpg",
          "caption": "1/2バースデー",
          "date": "2025.10.19",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0591",
          "file": "g/birthday-studio-et-hashima-09.jpg",
          "caption": "バースデー",
          "date": "2025.10.18",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0587",
          "file": "g/shichigosan-girl-studio-et-hashima-37.jpg",
          "caption": "753",
          "date": "2025.10.01",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0584",
          "file": "g/shichigosan-girl-studio-et-hashima-38.jpg",
          "caption": "753",
          "date": "2025.09.25",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0579",
          "file": "g/shichigosan-girl-studio-et-hashima-39.jpg",
          "caption": "753",
          "date": "2025.09.24",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0578",
          "file": "g/half-coming-of-age-girl-family-studio-et-hashima-01.jpg",
          "caption": "1/2成人式",
          "date": "2025.09.21",
          "ar": 0.6667,
          "tags": [
            "753",
            "halfseijin",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0574",
          "file": "g/shichigosan-girl-studio-et-hashima-40.jpg",
          "caption": "753",
          "date": "2025.09.18",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0575",
          "file": "g/shichigosan-girl-studio-et-hashima-41.jpg",
          "caption": "753",
          "date": "2025.09.18",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0571",
          "file": "g/shichigosan-girl-studio-et-hashima-42.jpg",
          "caption": "753",
          "date": "2025.09.10",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0572",
          "file": "g/shichigosan-girl-studio-et-hashima-43.jpg",
          "caption": "753",
          "date": "2025.09.10",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0564",
          "file": "g/school-entrance-studio-et-hashima-03.jpg",
          "caption": "バースデー",
          "date": "2025.09.06",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "school"
          ]
        },
        {
          "no": "0565",
          "file": "g/school-entrance-studio-et-hashima-04.jpg",
          "caption": "バースデー",
          "date": "2025.09.06",
          "ar": 1.25,
          "tags": [
            "school",
            "birthday"
          ]
        },
        {
          "no": "0560",
          "file": "g/birthday-studio-et-hashima-10.jpg",
          "caption": "バースデー",
          "date": "2025.08.30",
          "ar": 1.2491,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0557",
          "file": "g/shichigosan-boy-studio-et-hashima-08.jpg",
          "caption": "753",
          "date": "2025.08.28",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0558",
          "file": "g/shichigosan-boy-studio-et-hashima-09.jpg",
          "caption": "753",
          "date": "2025.08.28",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0553",
          "file": "g/shichigosan-boy-studio-et-hashima-10.jpg",
          "caption": "753",
          "date": "2025.08.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0549",
          "file": "g/omiyamairi-newborn-studio-et-hashima-04.jpg",
          "caption": "お宮参り",
          "date": "2025.08.17",
          "ar": 0.6667,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0550",
          "file": "g/omiyamairi-newborn-studio-et-hashima-05.jpg",
          "caption": "お宮参り",
          "date": "2025.08.17",
          "ar": 0.6667,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0544",
          "file": "g/shichigosan-girl-studio-et-hashima-44.jpg",
          "caption": "753",
          "date": "2025.08.13",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0545",
          "file": "g/shichigosan-girl-studio-et-hashima-45.jpg",
          "caption": "753",
          "date": "2025.08.13",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0541",
          "file": "g/shichigosan-girl-studio-et-hashima-46.jpg",
          "caption": "753",
          "date": "2025.08.06",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0542",
          "file": "g/shichigosan-girl-studio-et-hashima-47.jpg",
          "caption": "753",
          "date": "2025.08.06",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0537",
          "file": "g/shichigosan-girl-studio-et-hashima-48.jpg",
          "caption": "753",
          "date": "2025.08.04",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0533",
          "file": "g/shichigosan-girl-studio-et-hashima-49.jpg",
          "caption": "753",
          "date": "2025.07.22",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0535",
          "file": "g/shichigosan-girl-studio-et-hashima-50.jpg",
          "caption": "753",
          "date": "2025.07.22",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0521",
          "file": "g/shichigosan-girl-studio-et-hashima-51.jpg",
          "caption": "753",
          "date": "2025.07.10",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0522",
          "file": "g/shichigosan-girl-studio-et-hashima-52.jpg",
          "caption": "753",
          "date": "2025.07.10",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0519",
          "file": "g/shichigosan-girl-studio-et-hashima-53.jpg",
          "caption": "753",
          "date": "2025.07.09",
          "ar": 0.6681,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0514",
          "file": "g/shichigosan-boy-studio-et-hashima-11.jpg",
          "caption": "753",
          "date": "2025.07.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0515",
          "file": "g/shichigosan-boy-studio-et-hashima-12.jpg",
          "caption": "753",
          "date": "2025.07.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0516",
          "file": "g/shichigosan-boy-studio-et-hashima-13.jpg",
          "caption": "753",
          "date": "2025.07.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0513",
          "file": "g/shichigosan-girl-studio-et-hashima-54.jpg",
          "caption": "753",
          "date": "2025.06.29",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0510",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-06.jpg",
          "caption": "753",
          "date": "2025.06.27",
          "ar": 1.25,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0511",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-07.jpg",
          "caption": "753",
          "date": "2025.06.27",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0507",
          "file": "g/half-coming-of-age-girl-studio-et-hashima-01.jpg",
          "caption": "1/2成人式",
          "date": "2025.06.14",
          "ar": 1.2491,
          "tags": [
            "753",
            "halfseijin",
            "753girl"
          ]
        },
        {
          "no": "0508",
          "file": "g/half-coming-of-age-girl-studio-et-hashima-02.jpg",
          "caption": "1/2成人式",
          "date": "2025.06.14",
          "ar": 1.25,
          "tags": [
            "753",
            "halfseijin",
            "753girl"
          ]
        },
        {
          "no": "0506",
          "file": "g/maternity-studio-et-hashima-03.jpg",
          "caption": "マタニティ",
          "date": "2025.06.10",
          "ar": 1.2491,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0503",
          "file": "g/half-coming-of-age-girl-family-studio-et-hashima-02.jpg",
          "caption": "1/2成人式",
          "date": "2025.06.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "halfseijin",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0504",
          "file": "g/half-coming-of-age-girl-family-studio-et-hashima-03.jpg",
          "caption": "1/2成人式",
          "date": "2025.06.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "halfseijin",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0499",
          "file": "g/shichigosan-girl-studio-et-hashima-55.jpg",
          "caption": "753",
          "date": "2025.06.04",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0501",
          "file": "g/shichigosan-girl-studio-et-hashima-56.jpg",
          "caption": "753",
          "date": "2025.06.04",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0495",
          "file": "g/school-entrance-studio-et-hashima-05.jpg",
          "caption": "入園・入学",
          "date": "2025.06.01",
          "ar": 1.2491,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0496",
          "file": "g/school-entrance-studio-et-hashima-06.jpg",
          "caption": "入園・入学",
          "date": "2025.06.01",
          "ar": 1.25,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0492",
          "file": "g/shichigosan-boy-studio-et-hashima-14.jpg",
          "caption": "753",
          "date": "2025.05.29",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0493",
          "file": "g/shichigosan-boy-studio-et-hashima-15.jpg",
          "caption": "753",
          "date": "2025.05.29",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0488",
          "file": "g/half-birthday-studio-et-hashima-17.jpg",
          "caption": "1/2バースデー",
          "date": "2025.05.27",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0490",
          "file": "g/birthday-studio-et-hashima-11.jpg",
          "caption": "バースデー",
          "date": "2025.05.27",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0487",
          "file": "g/birthday-family-studio-et-hashima-07.jpg",
          "caption": "バースデー",
          "date": "2025.05.26",
          "ar": 0.6667,
          "tags": [
            "family",
            "birthday"
          ]
        },
        {
          "no": "0483",
          "file": "g/shichigosan-boy-studio-et-hashima-16.jpg",
          "caption": "753",
          "date": "2025.05.24",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0484",
          "file": "g/shichigosan-boy-studio-et-hashima-17.jpg",
          "caption": "753",
          "date": "2025.05.24",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0485",
          "file": "g/shichigosan-boy-studio-et-hashima-18.jpg",
          "caption": "753",
          "date": "2025.05.24",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0480",
          "file": "g/omiyamairi-newborn-girl-family-studio-et-hashima-01.jpg",
          "caption": "お宮参り",
          "date": "2025.05.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family",
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0481",
          "file": "g/omiyamairi-newborn-girl-family-studio-et-hashima-02.jpg",
          "caption": "お宮参り",
          "date": "2025.05.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "omiyamairi",
            "100days",
            "family"
          ]
        },
        {
          "no": "0478",
          "file": "g/shichigosan-girl-studio-et-hashima-57.jpg",
          "caption": "753",
          "date": "2025.05.10",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0473",
          "file": "g/half-coming-of-age-studio-et-hashima-04.jpg",
          "caption": "1/2成人式",
          "date": "2025.05.08",
          "ar": 1.25,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0475",
          "file": "g/half-coming-of-age-studio-et-hashima-05.jpg",
          "caption": "1/2成人式",
          "date": "2025.05.08",
          "ar": 1.2491,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0472",
          "file": "g/maternity-studio-et-hashima-04.jpg",
          "caption": "マタニティ",
          "date": "2025.05.05",
          "ar": 0.6667,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0468",
          "file": "g/shichigosan-girl-studio-et-hashima-58.jpg",
          "caption": "753",
          "date": "2025.04.24",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0469",
          "file": "g/shichigosan-girl-studio-et-hashima-59.jpg",
          "caption": "753",
          "date": "2025.04.24",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0471",
          "file": "g/shichigosan-girl-studio-et-hashima-60.jpg",
          "caption": "753",
          "date": "2025.04.24",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0465",
          "file": "g/half-birthday-studio-et-hashima-18.jpg",
          "caption": "1/2バースデー",
          "date": "2025.04.21",
          "ar": 1.2491,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0467",
          "file": "g/half-birthday-studio-et-hashima-19.jpg",
          "caption": "1/2バースデー",
          "date": "2025.04.21",
          "ar": 1.25,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0460",
          "file": "g/shichigosan-girl-studio-et-hashima-61.jpg",
          "caption": "753",
          "date": "2025.04.13",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0462",
          "file": "g/shichigosan-girl-studio-et-hashima-62.jpg",
          "caption": "753",
          "date": "2025.04.13",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0454",
          "file": "g/shichigosan-girl-studio-et-hashima-63.jpg",
          "caption": "753",
          "date": "2025.04.08",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0455",
          "file": "g/shichigosan-girl-studio-et-hashima-64.jpg",
          "caption": "753",
          "date": "2025.04.08",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0446",
          "file": "g/shichigosan-girl-studio-et-hashima-65.jpg",
          "caption": "753",
          "date": "2025.03.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0448",
          "file": "g/shichigosan-girl-studio-et-hashima-66.jpg",
          "caption": "753",
          "date": "2025.03.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0440",
          "file": "g/shichigosan-girl-family-studio-et-hashima-09.jpg",
          "caption": "753",
          "date": "2025.03.22",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0441",
          "file": "g/shichigosan-girl-family-studio-et-hashima-10.jpg",
          "caption": "753",
          "date": "2025.03.22",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0433",
          "file": "g/half-coming-of-age-studio-et-hashima-06.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.13",
          "ar": 1.2491,
          "tags": [
            "halfseijin",
            "other"
          ]
        },
        {
          "no": "0434",
          "file": "g/half-coming-of-age-studio-et-hashima-07.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.13",
          "ar": 1.2491,
          "tags": [
            "halfseijin",
            "other"
          ]
        },
        {
          "no": "0435",
          "file": "g/half-coming-of-age-studio-et-hashima-08.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.13",
          "ar": 1.25,
          "tags": [
            "halfseijin",
            "other"
          ]
        },
        {
          "no": "0428",
          "file": "g/shichigosan-girl-studio-et-hashima-67.jpg",
          "caption": "753",
          "date": "2025.03.09",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0424",
          "file": "g/shichigosan-boy-studio-et-hashima-19.jpg",
          "caption": "753",
          "date": "2025.03.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0426",
          "file": "g/shichigosan-boy-studio-et-hashima-20.jpg",
          "caption": "753",
          "date": "2025.03.08",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0420",
          "file": "g/shichigosan-boy-studio-et-hashima-21.jpg",
          "caption": "753",
          "date": "2025.03.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0417",
          "file": "g/school-entrance-studio-et-hashima-07.jpg",
          "caption": "入園・入学",
          "date": "2025.03.04",
          "ar": 1.25,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0418",
          "file": "g/school-entrance-studio-et-hashima-08.jpg",
          "caption": "入園・入学",
          "date": "2025.03.04",
          "ar": 1.2491,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0414",
          "file": "g/half-coming-of-age-studio-et-hashima-09.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.02",
          "ar": 1.25,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0415",
          "file": "g/half-coming-of-age-studio-et-hashima-10.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.02",
          "ar": 1.2491,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0410",
          "file": "g/half-coming-of-age-studio-et-hashima-11.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.01",
          "ar": 1.25,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0412",
          "file": "g/half-coming-of-age-studio-et-hashima-12.jpg",
          "caption": "1/2成人式",
          "date": "2025.03.01",
          "ar": 1.2491,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0404",
          "file": "g/school-entrance-studio-et-hashima-09.jpg",
          "caption": "入園・入学",
          "date": "2025.02.27",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0405",
          "file": "g/school-entrance-studio-et-hashima-10.jpg",
          "caption": "入園・入学",
          "date": "2025.02.27",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0406",
          "file": "g/school-entrance-studio-et-hashima-11.jpg",
          "caption": "入園・入学",
          "date": "2025.02.27",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0402",
          "file": "g/school-entrance-studio-et-hashima-12.jpg",
          "caption": "入園・入学",
          "date": "2025.02.24",
          "ar": 1.2491,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0399",
          "file": "g/shichigosan-girl-studio-et-hashima-68.jpg",
          "caption": "753",
          "date": "2025.02.23",
          "ar": 0.6681,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0392",
          "file": "g/shichigosan-girl-studio-et-hashima-69.jpg",
          "caption": "753",
          "date": "2025.02.21",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0394",
          "file": "g/shichigosan-girl-studio-et-hashima-70.jpg",
          "caption": "753",
          "date": "2025.02.21",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0389",
          "file": "g/birthday-studio-et-hashima-12.jpg",
          "caption": "バースデー",
          "date": "2025.02.17",
          "ar": 1.2491,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0391",
          "file": "g/birthday-studio-et-hashima-13.jpg",
          "caption": "バースデー",
          "date": "2025.02.17",
          "ar": 1.25,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0386",
          "file": "g/shichigosan-boy-studio-et-hashima-22.jpg",
          "caption": "753",
          "date": "2025.02.09",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0387",
          "file": "g/shichigosan-boy-studio-et-hashima-23.jpg",
          "caption": "753",
          "date": "2025.02.09",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0375",
          "file": "g/shichigosan-girl-studio-et-hashima-71.jpg",
          "caption": "753",
          "date": "2025.02.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0376",
          "file": "g/shichigosan-girl-studio-et-hashima-72.jpg",
          "caption": "753",
          "date": "2025.02.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0372",
          "file": "g/shichigosan-boy-studio-et-hashima-24.jpg",
          "caption": "753",
          "date": "2025.01.31",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0373",
          "file": "g/shichigosan-boy-studio-et-hashima-25.jpg",
          "caption": "753",
          "date": "2025.01.31",
          "ar": 1.2491,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0368",
          "file": "g/omiyamairi-newborn-studio-et-hashima-06.jpg",
          "caption": "お宮参り",
          "date": "2025.01.29",
          "ar": 1.2491,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0369",
          "file": "g/omiyamairi-newborn-studio-et-hashima-07.jpg",
          "caption": "お宮参り",
          "date": "2025.01.29",
          "ar": 1.25,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0367",
          "file": "g/shichigosan-girl-family-studio-et-hashima-11.jpg",
          "caption": "753",
          "date": "2025.01.24",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0365",
          "file": "g/shichigosan-girl-studio-et-hashima-73.jpg",
          "caption": "753",
          "date": "2025.01.18",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0355",
          "file": "g/half-birthday-studio-et-hashima-20.jpg",
          "caption": "1/2バースデー",
          "date": "2025.01.12",
          "ar": 1.25,
          "tags": [
            "halfbd",
            "other"
          ]
        },
        {
          "no": "0356",
          "file": "g/half-birthday-studio-et-hashima-21.jpg",
          "caption": "1/2バースデー",
          "date": "2025.01.12",
          "ar": 1.2491,
          "tags": [
            "halfbd",
            "other"
          ]
        },
        {
          "no": "0350",
          "file": "g/half-birthday-studio-et-hashima-22.jpg",
          "caption": "1/2バースデー",
          "date": "2025.01.10",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0353",
          "file": "g/half-birthday-studio-et-hashima-23.jpg",
          "caption": "1/2バースデー",
          "date": "2025.01.10",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0345",
          "file": "g/half-coming-of-age-studio-et-hashima-13.jpg",
          "caption": "1/2成人式",
          "date": "2025.01.07",
          "ar": 0.6667,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0346",
          "file": "g/half-coming-of-age-studio-et-hashima-14.jpg",
          "caption": "1/2成人式",
          "date": "2025.01.07",
          "ar": 0.6667,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0348",
          "file": "g/half-coming-of-age-studio-et-hashima-15.jpg",
          "caption": "1/2成人式",
          "date": "2025.01.07",
          "ar": 0.6667,
          "tags": [
            "halfseijin"
          ]
        },
        {
          "no": "0340",
          "file": "g/shichigosan-girl-family-studio-et-hashima-12.jpg",
          "caption": "753",
          "date": "2025.01.04",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0341",
          "file": "g/shichigosan-girl-family-studio-et-hashima-13.jpg",
          "caption": "753",
          "date": "2025.01.04",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0342",
          "file": "g/shichigosan-girl-family-studio-et-hashima-14.jpg",
          "caption": "753",
          "date": "2025.01.04",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0336",
          "file": "g/omiyamairi-newborn-studio-et-hashima-08.jpg",
          "caption": "お宮参り",
          "date": "2024.12.30",
          "ar": 1.25,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0338",
          "file": "g/omiyamairi-newborn-studio-et-hashima-09.jpg",
          "caption": "お宮参り",
          "date": "2024.12.30",
          "ar": 1.2491,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0332",
          "file": "g/photo-family-studio-et-hashima-01.jpg",
          "caption": "家族",
          "date": "2024.12.26",
          "ar": 0.6667,
          "tags": [
            "family"
          ]
        },
        {
          "no": "0333",
          "file": "g/photo-family-studio-et-hashima-02.jpg",
          "caption": "家族",
          "date": "2024.12.26",
          "ar": 0.6667,
          "tags": [
            "family"
          ]
        },
        {
          "no": "0334",
          "file": "g/photo-family-studio-et-hashima-03.jpg",
          "caption": "家族",
          "date": "2024.12.26",
          "ar": 0.6667,
          "tags": [
            "family"
          ]
        },
        {
          "no": "0326",
          "file": "g/shichigosan-girl-studio-et-hashima-74.jpg",
          "caption": "753",
          "date": "2024.12.13",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0322",
          "file": "g/half-birthday-studio-et-hashima-24.jpg",
          "caption": "1/2バースデー",
          "date": "2024.12.11",
          "ar": 0.6667,
          "tags": [
            "halfbd",
            "birthday"
          ]
        },
        {
          "no": "0311",
          "file": "g/shichigosan-girl-studio-et-hashima-75.jpg",
          "caption": "753",
          "date": "2024.11.28",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0312",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-08.jpg",
          "caption": "753",
          "date": "2024.11.28",
          "ar": 0.6667,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0313",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-09.jpg",
          "caption": "753",
          "date": "2024.11.28",
          "ar": 0.6667,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0307",
          "file": "g/shichigosan-girl-studio-et-hashima-76.jpg",
          "caption": "753",
          "date": "2024.11.24",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0309",
          "file": "g/shichigosan-girl-studio-et-hashima-77.jpg",
          "caption": "753",
          "date": "2024.11.24",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0305",
          "file": "g/shichigosan-girl-studio-et-hashima-78.jpg",
          "caption": "753",
          "date": "2024.11.21",
          "ar": 1.2491,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0299",
          "file": "g/birthday-studio-et-hashima-14.jpg",
          "caption": "バースデー",
          "date": "2024.11.14",
          "ar": 1.2491,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0300",
          "file": "g/birthday-studio-et-hashima-15.jpg",
          "caption": "バースデー",
          "date": "2024.11.14",
          "ar": 1.25,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0292",
          "file": "g/shichigosan-boy-studio-et-hashima-26.jpg",
          "caption": "753",
          "date": "2024.10.30",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0293",
          "file": "g/shichigosan-boy-studio-et-hashima-27.jpg",
          "caption": "753",
          "date": "2024.10.30",
          "ar": 0.6652,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0277",
          "file": "g/birthday-studio-et-hashima-16.jpg",
          "caption": "バースデー",
          "date": "2024.10.23",
          "ar": 1.2486,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0274",
          "file": "g/shichigosan-girl-studio-et-hashima-79.jpg",
          "caption": "753",
          "date": "2024.10.22",
          "ar": 1.2486,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0270",
          "file": "g/birthday-studio-et-hashima-17.jpg",
          "caption": "バースデー",
          "date": "2024.10.20",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0271",
          "file": "g/birthday-studio-et-hashima-18.jpg",
          "caption": "バースデー",
          "date": "2024.10.20",
          "ar": 0.6648,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0267",
          "file": "g/shichigosan-girl-family-studio-et-hashima-15.jpg",
          "caption": "753",
          "date": "2024.10.14",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0268",
          "file": "g/shichigosan-girl-family-studio-et-hashima-16.jpg",
          "caption": "753",
          "date": "2024.10.14",
          "ar": 0.6667,
          "tags": [
            "753",
            "family",
            "753girl"
          ]
        },
        {
          "no": "0261",
          "file": "g/school-entrance-studio-et-hashima-13.jpg",
          "caption": "入園・入学",
          "date": "2024.10.05",
          "ar": 1.2486,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0262",
          "file": "g/school-entrance-studio-et-hashima-14.jpg",
          "caption": "入園・入学",
          "date": "2024.10.05",
          "ar": 1.2486,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0249",
          "file": "g/photo-family-studio-et-hashima-04.jpg",
          "caption": "家族",
          "date": "2024.09.25",
          "ar": 0.6652,
          "tags": [
            "family"
          ]
        },
        {
          "no": "0251",
          "file": "g/photo-family-studio-et-hashima-05.jpg",
          "caption": "家族",
          "date": "2024.09.25",
          "ar": 0.6652,
          "tags": [
            "family"
          ]
        },
        {
          "no": "0247",
          "file": "g/school-entrance-studio-et-hashima-15.jpg",
          "caption": "入園・入学",
          "date": "2024.09.24",
          "ar": 1.25,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0244",
          "file": "g/shichigosan-girl-studio-et-hashima-80.jpg",
          "caption": "753",
          "date": "2024.09.19",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0243",
          "file": "g/birthday-studio-et-hashima-19.jpg",
          "caption": "バースデー",
          "date": "2024.09.17",
          "ar": 0.6644,
          "tags": [
            "birthday",
            "other"
          ]
        },
        {
          "no": "0240",
          "file": "g/birthday-studio-et-hashima-20.jpg",
          "caption": "バースデー",
          "date": "2024.09.15",
          "ar": 0.6648,
          "tags": [
            "other",
            "birthday"
          ]
        },
        {
          "no": "0241",
          "file": "g/birthday-studio-et-hashima-21.jpg",
          "caption": "バースデー",
          "date": "2024.09.15",
          "ar": 0.6648,
          "tags": [
            "birthday",
            "other"
          ]
        },
        {
          "no": "0237",
          "file": "g/shichigosan-girl-studio-et-hashima-81.jpg",
          "caption": "753",
          "date": "2024.09.13",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0234",
          "file": "g/shichigosan-girl-studio-et-hashima-82.jpg",
          "caption": "753",
          "date": "2024.09.02",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0229",
          "file": "g/shichigosan-boy-studio-et-hashima-28.jpg",
          "caption": "753",
          "date": "2024.08.28",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0230",
          "file": "g/shichigosan-boy-studio-et-hashima-29.jpg",
          "caption": "753",
          "date": "2024.08.28",
          "ar": 0.6629,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0225",
          "file": "g/shichigosan-boy-studio-et-hashima-30.jpg",
          "caption": "753",
          "date": "2024.08.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0226",
          "file": "g/shichigosan-boy-studio-et-hashima-31.jpg",
          "caption": "753",
          "date": "2024.08.27",
          "ar": 0.6667,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0227",
          "file": "g/shichigosan-boy-studio-et-hashima-32.jpg",
          "caption": "753",
          "date": "2024.08.27",
          "ar": 0.6652,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0222",
          "file": "g/half-birthday-studio-et-hashima-25.jpg",
          "caption": "1/2バースデー",
          "date": "2024.08.24",
          "ar": 0.6652,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0224",
          "file": "g/half-birthday-studio-et-hashima-26.jpg",
          "caption": "1/2バースデー",
          "date": "2024.08.24",
          "ar": 0.6652,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0219",
          "file": "g/event-studio-et-hashima-01.jpg",
          "caption": "イベント",
          "date": "2024.08.23",
          "ar": 1.2437,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0214",
          "file": "g/shichigosan-girl-studio-et-hashima-83.jpg",
          "caption": "753",
          "date": "2024.08.18",
          "ar": 1.2493,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0215",
          "file": "g/shichigosan-girl-studio-et-hashima-84.jpg",
          "caption": "753",
          "date": "2024.08.18",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0210",
          "file": "g/photo-studio-et-hashima-02.jpg",
          "caption": "Photo",
          "date": "2024.08.13",
          "ar": 1.25,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0211",
          "file": "g/shichigosan-girl-studio-et-hashima-85.jpg",
          "caption": "753",
          "date": "2024.08.13",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0209",
          "file": "g/birthday-studio-et-hashima-22.jpg",
          "caption": "バースデー",
          "date": "2024.08.12",
          "ar": 0.6652,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0203",
          "file": "g/birthday-studio-et-hashima-23.jpg",
          "caption": "バースデー",
          "date": "2024.08.02",
          "ar": 0.6667,
          "tags": [
            "other",
            "birthday"
          ]
        },
        {
          "no": "0204",
          "file": "g/birthday-studio-et-hashima-24.jpg",
          "caption": "バースデー",
          "date": "2024.08.02",
          "ar": 0.6652,
          "tags": [
            "birthday",
            "other"
          ]
        },
        {
          "no": "0205",
          "file": "g/birthday-studio-et-hashima-25.jpg",
          "caption": "バースデー",
          "date": "2024.08.02",
          "ar": 0.6652,
          "tags": [
            "birthday",
            "other"
          ]
        },
        {
          "no": "0200",
          "file": "g/half-coming-of-age-girl-studio-et-hashima-03.jpg",
          "caption": "1/2成人式",
          "date": "2024.07.28",
          "ar": 0.6637,
          "tags": [
            "753",
            "halfseijin",
            "753girl"
          ]
        },
        {
          "no": "0201",
          "file": "g/half-coming-of-age-girl-studio-et-hashima-04.jpg",
          "caption": "1/2成人式",
          "date": "2024.07.28",
          "ar": 0.6599,
          "tags": [
            "753",
            "halfseijin",
            "753girl"
          ]
        },
        {
          "no": "0196",
          "file": "g/shichigosan-girl-studio-et-hashima-86.jpg",
          "caption": "753",
          "date": "2024.07.26",
          "ar": 1.2493,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0197",
          "file": "g/shichigosan-girl-studio-et-hashima-87.jpg",
          "caption": "753",
          "date": "2024.07.26",
          "ar": 1.25,
          "tags": [
            "753",
            "753girl"
          ]
        },
        {
          "no": "0189",
          "file": "g/school-entrance-studio-et-hashima-16.jpg",
          "caption": "バースデー",
          "date": "2024.07.11",
          "ar": 0.6644,
          "tags": [
            "school",
            "birthday"
          ]
        },
        {
          "no": "0191",
          "file": "g/school-entrance-studio-et-hashima-17.jpg",
          "caption": "バースデー",
          "date": "2024.07.11",
          "ar": 0.6648,
          "tags": [
            "school",
            "birthday"
          ]
        },
        {
          "no": "0185",
          "file": "g/half-birthday-studio-et-hashima-27.jpg",
          "caption": "1/2バースデー",
          "date": "2024.07.09",
          "ar": 1.25,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0187",
          "file": "g/half-birthday-studio-et-hashima-28.jpg",
          "caption": "1/2バースデー",
          "date": "2024.07.09",
          "ar": 1.2493,
          "tags": [
            "birthday",
            "halfbd"
          ]
        },
        {
          "no": "0182",
          "file": "g/maternity-family-studio-et-hashima-09.jpg",
          "caption": "マタニティ",
          "date": "2024.06.29",
          "ar": 1.2493,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0183",
          "file": "g/maternity-studio-et-hashima-05.jpg",
          "caption": "マタニティ",
          "date": "2024.06.29",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0177",
          "file": "g/maternity-studio-et-hashima-06.jpg",
          "caption": "マタニティ",
          "date": "2024.06.26",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0178",
          "file": "g/maternity-family-studio-et-hashima-10.jpg",
          "caption": "マタニティ",
          "date": "2024.06.26",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0179",
          "file": "g/maternity-family-studio-et-hashima-11.jpg",
          "caption": "マタニティ",
          "date": "2024.06.26",
          "ar": 1.2493,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0176",
          "file": "g/omiyamairi-newborn-studio-et-hashima-10.jpg",
          "caption": "お宮参り",
          "date": "2024.06.24",
          "ar": 0.6652,
          "tags": [
            "omiyamairi",
            "100days"
          ]
        },
        {
          "no": "0172",
          "file": "g/birthday-studio-et-hashima-26.jpg",
          "caption": "バースデー",
          "date": "2024.06.20",
          "ar": 0.6644,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0173",
          "file": "g/birthday-studio-et-hashima-27.jpg",
          "caption": "バースデー",
          "date": "2024.06.20",
          "ar": 0.6648,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0174",
          "file": "g/photo-studio-et-hashima-03.jpg",
          "caption": "Photo",
          "date": "2024.06.20",
          "ar": 0.6652,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0167",
          "file": "g/school-entrance-studio-et-hashima-18.jpg",
          "caption": "入園・入学",
          "date": "2024.06.15",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0169",
          "file": "g/school-entrance-studio-et-hashima-19.jpg",
          "caption": "入園・入学",
          "date": "2024.06.15",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0170",
          "file": "g/school-entrance-studio-et-hashima-20.jpg",
          "caption": "入園・入学",
          "date": "2024.06.15",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0162",
          "file": "g/birthday-studio-et-hashima-28.jpg",
          "caption": "バースデー",
          "date": "2024.06.11",
          "ar": 0.6652,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0164",
          "file": "g/birthday-studio-et-hashima-29.jpg",
          "caption": "バースデー",
          "date": "2024.06.11",
          "ar": 0.6652,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0158",
          "file": "g/maternity-studio-et-hashima-07.jpg",
          "caption": "マタニティ",
          "date": "2024.06.08",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0159",
          "file": "g/maternity-studio-et-hashima-08.jpg",
          "caption": "マタニティ",
          "date": "2024.06.08",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0160",
          "file": "g/maternity-studio-et-hashima-09.jpg",
          "caption": "マタニティ",
          "date": "2024.06.08",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0155",
          "file": "g/maternity-family-studio-et-hashima-12.jpg",
          "caption": "マタニティ",
          "date": "2024.06.03",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0156",
          "file": "g/maternity-family-studio-et-hashima-13.jpg",
          "caption": "マタニティ",
          "date": "2024.06.03",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0149",
          "file": "g/event-studio-et-hashima-02.jpg",
          "caption": "イベント",
          "date": "2024.05.31",
          "ar": 0.6659,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0150",
          "file": "g/event-studio-et-hashima-03.jpg",
          "caption": "イベント",
          "date": "2024.05.31",
          "ar": 0.6652,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0151",
          "file": "g/event-studio-et-hashima-04.jpg",
          "caption": "イベント",
          "date": "2024.05.31",
          "ar": 0.6652,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0152",
          "file": "g/event-studio-et-hashima-05.jpg",
          "caption": "イベント",
          "date": "2024.05.31",
          "ar": 0.6652,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0147",
          "file": "g/shichigosan-girl-studio-et-hashima-88.jpg",
          "caption": "753",
          "date": "2024.05.19",
          "ar": 0.6663,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0139",
          "file": "g/photo-studio-et-hashima-04.jpg",
          "caption": "Photo",
          "date": "2024.04.27",
          "ar": 0.6667,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0140",
          "file": "g/birthday-studio-et-hashima-30.jpg",
          "caption": "バースデー",
          "date": "2024.04.27",
          "ar": 0.6667,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0131",
          "file": "g/maternity-studio-et-hashima-10.jpg",
          "caption": "マタニティ",
          "date": "2024.04.17",
          "ar": 0.6659,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0133",
          "file": "g/maternity-studio-et-hashima-11.jpg",
          "caption": "マタニティ",
          "date": "2024.04.17",
          "ar": 0.6652,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0126",
          "file": "g/maternity-studio-et-hashima-12.jpg",
          "caption": "マタニティ",
          "date": "2024.04.09",
          "ar": 1.2493,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0127",
          "file": "g/maternity-studio-et-hashima-13.jpg",
          "caption": "マタニティ",
          "date": "2024.04.09",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0125",
          "file": "g/shichigosan-boy-studio-et-hashima-33.jpg",
          "caption": "753",
          "date": "2024.04.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0119",
          "file": "g/school-entrance-studio-et-hashima-21.jpg",
          "caption": "入園・入学",
          "date": "2024.03.24",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0120",
          "file": "g/school-entrance-studio-et-hashima-22.jpg",
          "caption": "入園・入学",
          "date": "2024.03.24",
          "ar": 0.6667,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0117",
          "file": "g/school-entrance-studio-et-hashima-23.jpg",
          "caption": "入園・入学",
          "date": "2024.03.22",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0118",
          "file": "g/school-entrance-studio-et-hashima-24.jpg",
          "caption": "入園・入学",
          "date": "2024.03.22",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0113",
          "file": "g/birthday-studio-et-hashima-31.jpg",
          "caption": "バースデー",
          "date": "2024.03.14",
          "ar": 1.2493,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0110",
          "file": "g/maternity-studio-et-hashima-14.jpg",
          "caption": "マタニティ",
          "date": "2024.03.12",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0106",
          "file": "g/maternity-family-studio-et-hashima-14.jpg",
          "caption": "マタニティ",
          "date": "2024.03.07",
          "ar": 1.25,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0107",
          "file": "g/maternity-family-studio-et-hashima-15.jpg",
          "caption": "マタニティ",
          "date": "2024.03.07",
          "ar": 1.2493,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0103",
          "file": "g/school-entrance-studio-et-hashima-25.jpg",
          "caption": "入園・入学",
          "date": "2024.02.29",
          "ar": 0.6648,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0104",
          "file": "g/school-entrance-studio-et-hashima-26.jpg",
          "caption": "入園・入学",
          "date": "2024.02.29",
          "ar": 0.6648,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0101",
          "file": "g/birthday-studio-et-hashima-32.jpg",
          "caption": "バースデー",
          "date": "2024.02.26",
          "ar": 1.25,
          "tags": [
            "other",
            "birthday"
          ]
        },
        {
          "no": "0094",
          "file": "g/maternity-family-studio-et-hashima-16.jpg",
          "caption": "マタニティ",
          "date": "2024.02.20",
          "ar": 1.2493,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0095",
          "file": "g/maternity-studio-et-hashima-15.jpg",
          "caption": "マタニティ",
          "date": "2024.02.20",
          "ar": 1.2493,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0096",
          "file": "g/maternity-studio-et-hashima-16.jpg",
          "caption": "マタニティ",
          "date": "2024.02.20",
          "ar": 1.2493,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0093",
          "file": "g/maternity-studio-et-hashima-17.jpg",
          "caption": "マタニティ",
          "date": "2024.02.19",
          "ar": 0.6652,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0090",
          "file": "g/school-entrance-studio-et-hashima-27.jpg",
          "caption": "入園・入学",
          "date": "2024.02.17",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0091",
          "file": "g/school-entrance-studio-et-hashima-28.jpg",
          "caption": "入園・入学",
          "date": "2024.02.17",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0083",
          "file": "g/school-entrance-studio-et-hashima-29.jpg",
          "caption": "入園・入学",
          "date": "2024.02.12",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0085",
          "file": "g/school-entrance-studio-et-hashima-30.jpg",
          "caption": "入園・入学",
          "date": "2024.02.12",
          "ar": 1.2493,
          "tags": [
            "school"
          ]
        },
        {
          "no": "0079",
          "file": "g/shichigosan-boy-studio-et-hashima-34.jpg",
          "caption": "753",
          "date": "2024.02.04",
          "ar": 0.667,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0080",
          "file": "g/shichigosan-boy-studio-et-hashima-35.jpg",
          "caption": "753",
          "date": "2024.02.04",
          "ar": 0.6648,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0075",
          "file": "g/photo-studio-et-hashima-05.jpg",
          "caption": "Photo",
          "date": "2024.01.27",
          "ar": 0.6667,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0076",
          "file": "g/photo-studio-et-hashima-06.jpg",
          "caption": "Photo",
          "date": "2024.01.27",
          "ar": 0.6667,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0077",
          "file": "g/photo-studio-et-hashima-07.jpg",
          "caption": "Photo",
          "date": "2024.01.27",
          "ar": 0.6667,
          "tags": [
            "other"
          ]
        },
        {
          "no": "0072",
          "file": "g/shichigosan-girl-studio-et-hashima-89.jpg",
          "caption": "753",
          "date": "2024.01.26",
          "ar": 0.6667,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0073",
          "file": "g/shichigosan-girl-studio-et-hashima-90.jpg",
          "caption": "753",
          "date": "2024.01.26",
          "ar": 0.6652,
          "tags": [
            "753",
            "753girl",
            "753girl"
          ]
        },
        {
          "no": "0068",
          "file": "g/maternity-family-studio-et-hashima-17.jpg",
          "caption": "マタニティ",
          "date": "2024.01.18",
          "ar": 0.6663,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0069",
          "file": "g/maternity-family-studio-et-hashima-18.jpg",
          "caption": "マタニティ",
          "date": "2024.01.18",
          "ar": 0.6663,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0066",
          "file": "g/maternity-studio-et-hashima-18.jpg",
          "caption": "マタニティ",
          "date": "2024.01.13",
          "ar": 1.25,
          "tags": [
            "maternity"
          ]
        },
        {
          "no": "0057",
          "file": "g/coming-of-age-studio-et-hashima-01.jpg",
          "caption": "成人式",
          "date": "2024.01.08",
          "ar": 0.6667,
          "tags": [
            "furisode",
            "seijin"
          ]
        },
        {
          "no": "0058",
          "file": "g/coming-of-age-studio-et-hashima-02.jpg",
          "caption": "成人式",
          "date": "2024.01.08",
          "ar": 0.6667,
          "tags": [
            "furisode",
            "seijin"
          ]
        },
        {
          "no": "0059",
          "file": "g/coming-of-age-studio-et-hashima-03.jpg",
          "caption": "成人式",
          "date": "2024.01.08",
          "ar": 0.6667,
          "tags": [
            "furisode",
            "seijin"
          ]
        },
        {
          "no": "0060",
          "file": "g/coming-of-age-studio-et-hashima-04.jpg",
          "caption": "成人式",
          "date": "2024.01.08",
          "ar": 0.6667,
          "tags": [
            "furisode",
            "seijin"
          ]
        },
        {
          "no": "0053",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-10.jpg",
          "caption": "753",
          "date": "2023.12.15",
          "ar": 0.6629,
          "tags": [
            "753",
            "753boy",
            "753girl",
            "family"
          ]
        },
        {
          "no": "0055",
          "file": "g/shichigosan-girl-boy-family-studio-et-hashima-11.jpg",
          "caption": "753",
          "date": "2023.12.15",
          "ar": 0.6629,
          "tags": [
            "753",
            "family",
            "753boy",
            "753girl"
          ]
        },
        {
          "no": "0049",
          "file": "g/birthday-studio-et-hashima-33.jpg",
          "caption": "バースデー",
          "date": "2023.12.10",
          "ar": 1.2493,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0051",
          "file": "g/birthday-studio-et-hashima-34.jpg",
          "caption": "バースデー",
          "date": "2023.12.10",
          "ar": 1.25,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0046",
          "file": "g/shichigosan-boy-studio-et-hashima-36.jpg",
          "caption": "753",
          "date": "2023.12.05",
          "ar": 1.25,
          "tags": [
            "753",
            "753boy"
          ]
        },
        {
          "no": "0048",
          "file": "g/shichigosan-boy-studio-et-hashima-37.jpg",
          "caption": "753",
          "date": "2023.12.05",
          "ar": 1.2493,
          "tags": [
            "753",
            "753boy",
            "753boy"
          ]
        },
        {
          "no": "0037",
          "file": "g/school-entrance-studio-et-hashima-31.jpg",
          "caption": "バースデー",
          "date": "2023.11.18",
          "ar": 1.2493,
          "tags": [
            "birthday",
            "school"
          ]
        },
        {
          "no": "0038",
          "file": "g/school-entrance-studio-et-hashima-32.jpg",
          "caption": "バースデー",
          "date": "2023.11.18",
          "ar": 1.2493,
          "tags": [
            "birthday",
            "school"
          ]
        },
        {
          "no": "0032",
          "file": "g/school-entrance-studio-et-hashima-33.jpg",
          "caption": "バースデー",
          "date": "2023.11.04",
          "ar": 0.6652,
          "tags": [
            "birthday",
            "school"
          ]
        },
        {
          "no": "0033",
          "file": "g/school-entrance-studio-et-hashima-34.jpg",
          "caption": "バースデー",
          "date": "2023.11.04",
          "ar": 0.6667,
          "tags": [
            "birthday",
            "school"
          ]
        },
        {
          "no": "0027",
          "file": "g/maternity-family-studio-et-hashima-19.jpg",
          "caption": "マタニティ",
          "date": "2023.10.11",
          "ar": 0.6626,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0013",
          "file": "g/maternity-family-studio-et-hashima-20.jpg",
          "caption": "マタニティ",
          "date": "2023.08.14",
          "ar": 0.6648,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0014",
          "file": "g/maternity-family-studio-et-hashima-21.jpg",
          "caption": "マタニティ",
          "date": "2023.08.14",
          "ar": 0.6629,
          "tags": [
            "maternity",
            "family"
          ]
        },
        {
          "no": "0009",
          "file": "g/school-entrance-family-studio-et-hashima-02.jpg",
          "caption": "バースデー",
          "date": "2023.08.08",
          "ar": 0.6659,
          "tags": [
            "family",
            "school",
            "birthday"
          ]
        },
        {
          "no": "0011",
          "file": "g/school-entrance-family-studio-et-hashima-03.jpg",
          "caption": "バースデー",
          "date": "2023.08.08",
          "ar": 0.6629,
          "tags": [
            "family",
            "birthday",
            "school"
          ]
        },
        {
          "no": "0005",
          "file": "g/school-entrance-family-studio-et-hashima-04.jpg",
          "caption": "バースデー",
          "date": "2023.08.02",
          "ar": 0.6674,
          "tags": [
            "family",
            "birthday",
            "school"
          ]
        },
        {
          "no": "0001",
          "file": "g/birthday-studio-et-hashima-35.jpg",
          "caption": "バースデー",
          "date": "2023.08.01",
          "ar": 0.6648,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0002",
          "file": "g/birthday-studio-et-hashima-36.jpg",
          "caption": "バースデー",
          "date": "2023.08.01",
          "ar": 0.6648,
          "tags": [
            "birthday"
          ]
        },
        {
          "no": "0863",
          "file": "g/event-studio-et-hashima-06.jpg",
          "caption": "イベント",
          "date": "",
          "ar": 1.7787,
          "tags": [
            "event"
          ]
        },
        {
          "no": "0901",
          "file": "g/event-studio-et-hashima-07.jpg",
          "caption": "イベント",
          "date": "",
          "ar": 1.7787,
          "tags": [
            "event"
          ]
        }
      ],
      "kimono": {
        "heading": "Kimono",
        "body": "和裁士によるオートクチュールの、一点ものの着物を仕立てています。\n花飾りのヘアアレンジも含めたトータルコーディネートをご提供します。",
        "items": [
          {
            "file": "kimono-3yo-girl-studio-et-hashima-01.jpg",
            "name": "三歳女の子 01",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-02.jpg",
            "name": "三歳女の子 02",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-03.jpg",
            "name": "三歳女の子 03",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-04.jpg",
            "name": "三歳女の子 04",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-05.jpg",
            "name": "三歳女の子 05",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-06.jpg",
            "name": "三歳女の子 06",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-07.jpg",
            "name": "三歳女の子 07",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-girl-studio-et-hashima-08.jpg",
            "name": "三歳女の子 08",
            "desc": "",
            "category": "3y-girl"
          },
          {
            "file": "kimono-7yo-girl-studio-et-hashima-01.jpg",
            "name": "七歳女の子 01",
            "desc": "",
            "category": "7y-girl"
          },
          {
            "file": "kimono-7yo-girl-studio-et-hashima-02.jpg",
            "name": "七歳女の子 02",
            "desc": "",
            "category": "7y-girl"
          },
          {
            "file": "kimono-7yo-girl-studio-et-hashima-03.jpg",
            "name": "七歳女の子 03",
            "desc": "",
            "category": "7y-girl"
          },
          {
            "file": "kimono-7yo-girl-studio-et-hashima-04.jpg",
            "name": "七歳女の子 04",
            "desc": "",
            "category": "7y-girl"
          },
          {
            "file": "kimono-10yo-girl-studio-et-hashima-01.jpg",
            "name": "十歳女の子 01",
            "desc": "",
            "category": "10y-girl"
          },
          {
            "file": "kimono-10yo-girl-studio-et-hashima-02.jpg",
            "name": "十歳女の子 02",
            "desc": "",
            "category": "10y-girl"
          },
          {
            "file": "kimono-10yo-girl-studio-et-hashima-03.jpg",
            "name": "十歳女の子 03",
            "desc": "",
            "category": "10y-girl"
          },
          {
            "file": "kimono-omiyamairi-studio-et-hashima-01.jpg",
            "name": "お宮参り 01",
            "desc": "",
            "category": "omairi"
          },
          {
            "file": "kimono-omiyamairi-studio-et-hashima-02.jpg",
            "name": "お宮参り 02",
            "desc": "",
            "category": "omairi"
          },
          {
            "file": "kimono-omiyamairi-studio-et-hashima-03.jpg",
            "name": "お宮参り 03",
            "desc": "",
            "category": "omairi"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-01.jpg",
            "name": "三歳男の子 01",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-02.jpg",
            "name": "三歳男の子 02",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-03.jpg",
            "name": "三歳男の子 03",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-04.jpg",
            "name": "三歳男の子 04",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-05.jpg",
            "name": "三歳男の子 05",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-06.jpg",
            "name": "三歳男の子 06",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-07.jpg",
            "name": "三歳男の子 07",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-08.jpg",
            "name": "三歳男の子 08",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-09.jpg",
            "name": "三歳男の子 09",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-studio-et-hashima-10.jpg",
            "name": "三歳男の子 10",
            "desc": "",
            "category": "3y-boy"
          },
          {
            "file": "kimono-5yo-boy-studio-et-hashima-01.jpg",
            "name": "五歳男の子 01",
            "desc": "",
            "category": "5y-boy"
          },
          {
            "file": "kimono-5yo-boy-studio-et-hashima-02.jpg",
            "name": "五歳男の子 02",
            "desc": "",
            "category": "5y-boy"
          },
          {
            "file": "kimono-5yo-boy-studio-et-hashima-03.jpg",
            "name": "五歳男の子 03",
            "desc": "",
            "category": "5y-boy"
          },
          {
            "file": "kimono-5yo-boy-studio-et-hashima-04.jpg",
            "name": "五歳男の子 04",
            "desc": "",
            "category": "5y-boy"
          },
          {
            "file": "kimono-10yo-boy-studio-et-hashima-01.jpg",
            "name": "十歳男の子 01",
            "desc": "",
            "category": "10y-boy"
          },
          {
            "file": "omairi-kimono-3yo-girl-studio-et-hashima-01.jpg",
            "name": "お詣り 三歳女の子 01",
            "desc": "",
            "category": "mairi-3g"
          },
          {
            "file": "omairi-kimono-3yo-girl-studio-et-hashima-02.jpg",
            "name": "お詣り 三歳女の子 02",
            "desc": "",
            "category": "mairi-3g"
          },
          {
            "file": "omairi-kimono-3yo-girl-studio-et-hashima-03.jpg",
            "name": "お詣り 三歳女の子 03",
            "desc": "",
            "category": "mairi-3g"
          },
          {
            "file": "omairi-kimono-7yo-girl-studio-et-hashima-01.jpg",
            "name": "お詣り 七歳女の子 01",
            "desc": "",
            "category": "mairi-7g"
          },
          {
            "file": "omairi-kimono-7yo-girl-studio-et-hashima-02.jpg",
            "name": "お詣り 七歳女の子 02",
            "desc": "",
            "category": "mairi-7g"
          },
          {
            "file": "omairi-kimono-7yo-girl-studio-et-hashima-03.jpg",
            "name": "お詣り 七歳女の子 03",
            "desc": "",
            "category": "mairi-7g"
          },
          {
            "file": "omairi-kimono-7yo-girl-studio-et-hashima-04.jpg",
            "name": "お詣り 七歳女の子 04",
            "desc": "",
            "category": "mairi-7g"
          },
          {
            "file": "omairi-kimono-3yo-boy-studio-et-hashima-01.jpg",
            "name": "お詣り 三歳男の子 01",
            "desc": "",
            "category": "mairi-3b"
          },
          {
            "file": "omairi-kimono-3yo-boy-studio-et-hashima-02.jpg",
            "name": "お詣り 三歳男の子 02",
            "desc": "",
            "category": "mairi-3b"
          },
          {
            "file": "omairi-kimono-3yo-boy-studio-et-hashima-03.jpg",
            "name": "お詣り 三歳男の子 03",
            "desc": "",
            "category": "mairi-3b"
          },
          {
            "file": "omairi-kimono-5yo-boy-studio-et-hashima-01.jpg",
            "name": "お詣り 五歳男の子 01",
            "desc": "",
            "category": "mairi-5b"
          },
          {
            "file": "omairi-kimono-5yo-boy-studio-et-hashima-02.jpg",
            "name": "お詣り 五歳男の子 02",
            "desc": "",
            "category": "mairi-5b"
          },
          {
            "file": "omairi-kimono-5yo-boy-studio-et-hashima-03.jpg",
            "name": "お詣り 五歳男の子 03",
            "desc": "",
            "category": "mairi-5b"
          }
        ]
      },
      "costume": {
        "heading": "Costume",
        "body": "スタジオの空間と調和する衣装を独自にセレクトしています。\nカジュアル衣装やジャケットスタイルなど、お子様の自然な表情が引き立つ一着をご用意しています。",
        "items": [
          {
            "file": "co/costume-baby-girl-studio-et-hashima-01.jpg",
            "name": "ベビー女の子 01",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-baby-girl-studio-et-hashima-02.jpg",
            "name": "ベビー女の子 02",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-baby-girl-studio-et-hashima-03.jpg",
            "name": "ベビー女の子 03",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-baby-girl-studio-et-hashima-04.jpg",
            "name": "ベビー女の子 04",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-baby-girl-studio-et-hashima-05.jpg",
            "name": "ベビー女の子 05",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-baby-girl-studio-et-hashima-06.jpg",
            "name": "ベビー女の子 06",
            "desc": "",
            "category": "baby-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-01.jpg",
            "name": "1歳女の子 01",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-02.jpg",
            "name": "1歳女の子 02",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-03.jpg",
            "name": "1歳女の子 03",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-04.jpg",
            "name": "1歳女の子 04",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-05.jpg",
            "name": "1歳女の子 05",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-1y-girl-studio-et-hashima-06.jpg",
            "name": "1歳女の子 06",
            "desc": "",
            "category": "1y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-01.jpg",
            "name": "2〜6歳女の子 01",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-02.jpg",
            "name": "2〜6歳女の子 02",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-03.jpg",
            "name": "2〜6歳女の子 03",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-04.jpg",
            "name": "2〜6歳女の子 04",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-05.jpg",
            "name": "2〜6歳女の子 05",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-2y6y-girl-studio-et-hashima-06.jpg",
            "name": "2〜6歳女の子 06",
            "desc": "",
            "category": "2y6y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-01.jpg",
            "name": "3〜8歳女の子 01",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-02.jpg",
            "name": "3〜8歳女の子 02",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-03.jpg",
            "name": "3〜8歳女の子 03",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-04.jpg",
            "name": "3〜8歳女の子 04",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-05.jpg",
            "name": "3〜8歳女の子 05",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-3y8y-girl-studio-et-hashima-06.jpg",
            "name": "3〜8歳女の子 06",
            "desc": "",
            "category": "3y8y-girl"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-01.jpg",
            "name": "ベビー男の子 01",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-02.jpg",
            "name": "ベビー男の子 02",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-03.jpg",
            "name": "ベビー男の子 03",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-04.jpg",
            "name": "ベビー男の子 04",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-05.jpg",
            "name": "ベビー男の子 05",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-baby-boy-studio-et-hashima-06.jpg",
            "name": "ベビー男の子 06",
            "desc": "",
            "category": "baby-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-01.jpg",
            "name": "1歳男の子 01",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-02.jpg",
            "name": "1歳男の子 02",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-03.jpg",
            "name": "1歳男の子 03",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-04.jpg",
            "name": "1歳男の子 04",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-05.jpg",
            "name": "1歳男の子 05",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-1y-boy-studio-et-hashima-06.jpg",
            "name": "1歳男の子 06",
            "desc": "",
            "category": "1y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-01.jpg",
            "name": "2〜6歳男の子 01",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-02.jpg",
            "name": "2〜6歳男の子 02",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-03.jpg",
            "name": "2〜6歳男の子 03",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-04.jpg",
            "name": "2〜6歳男の子 04",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-05.jpg",
            "name": "2〜6歳男の子 05",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-2y6y-boy-studio-et-hashima-06.jpg",
            "name": "2〜6歳男の子 06",
            "desc": "",
            "category": "2y6y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-01.jpg",
            "name": "3〜7歳男の子 01",
            "desc": "",
            "category": "3y7y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-02.jpg",
            "name": "3〜7歳男の子 02",
            "desc": "",
            "category": "3y7y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-03.jpg",
            "name": "3〜7歳男の子 03",
            "desc": "",
            "category": "3y7y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-04.jpg",
            "name": "3〜7歳男の子 04",
            "desc": "",
            "category": "3y7y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-05.jpg",
            "name": "3〜7歳男の子 05",
            "desc": "",
            "category": "3y7y-boy"
          },
          {
            "file": "co/costume-3y7y-boy-studio-et-hashima-06.jpg",
            "name": "3〜7歳男の子 06",
            "desc": "",
            "category": "3y7y-boy"
          }
        ],
        "gallery": [
          {
            "no": "0806",
            "file": "c/costume-half-birthday-studio-et-hashima-07.jpg",
            "caption": "1/2バースデー",
            "date": "2026.07.21",
            "ar": 1.2491,
            "tags": [
              "halfbd",
              "birthday"
            ]
          },
          {
            "no": "0775",
            "file": "c/costume-shichigosan-family-studio-et-hashima-01.jpg",
            "caption": "753",
            "date": "2026.06.01",
            "ar": 1.2491,
            "tags": [
              "753",
              "family"
            ]
          },
          {
            "no": "0772",
            "file": "c/costume-half-birthday-studio-et-hashima-06.jpg",
            "caption": "1/2バースデー",
            "date": "2026.05.27",
            "ar": 1.25,
            "tags": [
              "halfbd",
              "birthday"
            ]
          },
          {
            "no": "0755",
            "file": "c/costume-half-birthday-studio-et-hashima-05.jpg",
            "caption": "1/2バースデー",
            "date": "2026.05.08",
            "ar": 0.6667,
            "tags": [
              "halfbd",
              "birthday"
            ]
          },
          {
            "no": "0729",
            "file": "c/costume-photo-studio-et-hashima-02.jpg",
            "caption": "Photo",
            "date": "2026.04.07",
            "ar": 1.25,
            "tags": [
              "other"
            ]
          },
          {
            "no": "0719",
            "file": "c/costume-half-birthday-studio-et-hashima-04.jpg",
            "caption": "1/2バースデー",
            "date": "2026.03.21",
            "ar": 0.6667,
            "tags": [
              "birthday",
              "halfbd"
            ]
          },
          {
            "no": "0642",
            "file": "c/costume-half-birthday-studio-et-hashima-03.jpg",
            "caption": "1/2バースデー",
            "date": "2025.12.23",
            "ar": 1.2491,
            "tags": [
              "birthday",
              "halfbd"
            ]
          },
          {
            "no": "0635",
            "file": "c/costume-birthday-family-studio-et-hashima-02.jpg",
            "caption": "バースデー",
            "date": "2025.12.05",
            "ar": 0.6667,
            "tags": [
              "birthday",
              "family"
            ]
          },
          {
            "no": "0615",
            "file": "c/costume-half-birthday-family-studio-et-hashima-01.jpg",
            "caption": "1/2バースデー",
            "date": "2025.11.14",
            "ar": 0.6667,
            "tags": [
              "family",
              "birthday",
              "halfbd"
            ]
          },
          {
            "no": "0602",
            "file": "c/costume-birthday-studio-et-hashima-08.jpg",
            "caption": "バースデー",
            "date": "2025.10.31",
            "ar": 0.6667,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0565",
            "file": "c/costume-birthday-studio-et-hashima-07.jpg",
            "caption": "バースデー",
            "date": "2025.09.06",
            "ar": 1.25,
            "tags": [
              "school",
              "birthday"
            ]
          },
          {
            "no": "0435",
            "file": "c/costume-half-coming-of-age-studio-et-hashima-01.jpg",
            "caption": "1/2成人式",
            "date": "2025.03.13",
            "ar": 1.25,
            "tags": [
              "halfseijin",
              "other"
            ]
          },
          {
            "no": "0334",
            "file": "c/costume-photo-family-studio-et-hashima-01.jpg",
            "caption": "家族",
            "date": "2024.12.26",
            "ar": 0.6667,
            "tags": [
              "family"
            ]
          },
          {
            "no": "0277",
            "file": "c/costume-birthday-studio-et-hashima-06.jpg",
            "caption": "バースデー",
            "date": "2024.10.23",
            "ar": 1.2486,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0243",
            "file": "c/costume-birthday-studio-et-hashima-05.jpg",
            "caption": "バースデー",
            "date": "2024.09.17",
            "ar": 0.6644,
            "tags": [
              "birthday",
              "other"
            ]
          },
          {
            "no": "0224",
            "file": "c/costume-half-birthday-studio-et-hashima-02.jpg",
            "caption": "1/2バースデー",
            "date": "2024.08.24",
            "ar": 0.6652,
            "tags": [
              "birthday",
              "halfbd"
            ]
          },
          {
            "no": "0185",
            "file": "c/costume-half-birthday-studio-et-hashima-01.jpg",
            "caption": "1/2バースデー",
            "date": "2024.07.09",
            "ar": 1.25,
            "tags": [
              "birthday",
              "halfbd"
            ]
          },
          {
            "no": "0164",
            "file": "c/costume-birthday-studio-et-hashima-04.jpg",
            "caption": "バースデー",
            "date": "2024.06.11",
            "ar": 0.6652,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0140",
            "file": "c/costume-birthday-studio-et-hashima-03.jpg",
            "caption": "バースデー",
            "date": "2024.04.27",
            "ar": 0.6667,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0088",
            "file": "c/costume-birthday-studio-et-hashima-02.jpg",
            "caption": "バースデー",
            "date": "2024.02.16",
            "ar": 0.6667,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0051",
            "file": "c/costume-birthday-studio-et-hashima-01.jpg",
            "caption": "バースデー",
            "date": "2023.12.10",
            "ar": 1.25,
            "tags": [
              "birthday"
            ]
          },
          {
            "no": "0039",
            "file": "c/costume-photo-studio-et-hashima-01.jpg",
            "caption": "Photo",
            "date": "2023.11.19",
            "ar": 0.6659,
            "tags": [
              "other"
            ]
          },
          {
            "no": "0005",
            "file": "c/costume-birthday-family-studio-et-hashima-01.jpg",
            "caption": "バースデー",
            "date": "2023.08.02",
            "ar": 0.6674,
            "tags": [
              "family",
              "birthday",
              "school"
            ]
          }
        ]
      },
      "plans": [
        {
          "key": "one",
          "name": "One Plan",
          "desc": "「ちょっと気軽に\"いま\"を残したい」 メインのお子様1人のプラン。オプションで家族撮影・きょうだい撮影を追加できます。",
          "tag": "20CUT - 1衣装",
          "detail": {
            "heroImage": "plan-one-studio-et-hashima.jpg",
            "tagline": "ちょっと気軽に \"いま\" を残したい",
            "longDescription": "「ちょっと気軽に \"いま\" を残したい」――メインのお子様お一人のプランです。\n撮影料・編集済みデータ20カット・衣装1着・ヘアメイクがセットになっています。\nオプションで家族撮影・きょうだい撮影も追加いただけます。\nメインのお子様が2人以上いらっしゃる場合は Family Plan をお選びください。\nお子様1人でも、衣装を2着着たい方・カット数を多く残したい方は Family Plan（50カット／衣装2着）をご検討ください。\n\n753（3才・5才・7才）/ お宮参り / 100日祝 / ハーフバースデー / 1才バースデー / 2才以上のバースデー / 入園・入学 / ハーフ成人式 などの撮影メニューに対応しています。",
            "notes": "※土日祝は +¥5,500 となります。\n※メインのお子様が2人以上の場合は Family Plan をお選びください。\n※ご予約は1家族様1枠となります。2世帯で撮影されたい場合は2枠をご予約ください。\n※お宮参りの産着レンタル：当日スタジオ撮影×外レンタル ¥11,000 / 別日外レンタルのみ ¥11,000"
          },
          "variants": [
            {
              "cuts": 20,
              "label": "One Plan（20cut）",
              "price": "¥25,000",
              "duration": "",
              "description": "撮影料 + 撮影データ20cut + 衣装1着 / ヘアメイク（土日祝 +¥5,500）",
              "includes": [
                "撮影料（お子様1名分）",
                "編集済みデータ 20カット",
                "衣装1着",
                "ヘアメイク"
              ],
              "options": [
                {
                  "name": "きょうだい撮影",
                  "price": "¥4,500"
                },
                {
                  "name": "家族撮影",
                  "price": "¥4,500"
                },
                {
                  "name": "撮影料（きょうだい・家族撮影で撮影に入るお子様1人追加につき）",
                  "price": "¥2,200"
                },
                {
                  "name": "＋データ 5cut",
                  "price": "¥4,400"
                },
                {
                  "name": "＋データ 10cut（追加合計は10cutまで）",
                  "price": "¥6,600"
                },
                {
                  "name": "753 撮影料金（753撮影料金カレンダーをご確認ください）",
                  "price": "¥6,600〜"
                },
                {
                  "name": "お宮参り撮影料金",
                  "price": "¥3,300"
                },
                {
                  "name": "ハーフ成人 撮影料金（女児）",
                  "price": "¥15,000"
                },
                {
                  "name": "ハーフ成人 撮影料金（男児）",
                  "price": "¥11,000"
                },
                {
                  "name": "et.Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                },
                {
                  "name": "Art photo coordinate 1パターン（瓶差し・髪飾り・ランドセルなど）",
                  "price": "¥18,000〜"
                },
                {
                  "name": "追加パターン（1パターンにつき）",
                  "price": "+¥9,000",
                  "sub": true
                },
                {
                  "name": "Art photo coordinate（空間装飾）",
                  "price": "¥28,000〜"
                },
                {
                  "name": "追加パターン（瓶差し・髪飾り・ランドセルなど）",
                  "price": "+¥9,000",
                  "sub": true
                }
              ],
              "gallery": [
                "plan-one-studio-et-hashima.jpg",
                "plan-one-gallery-studio-et-hashima-02.jpg",
                "costume-dress-studio-et-hashima-03.jpg"
              ]
            }
          ]
        },
        {
          "key": "family",
          "name": "Family Plan",
          "desc": "「家族みんなで一緒に撮影したい」 メインのお子様が2人以上のプラン。お子様1人でも、衣装を2着着たい方・カット数を多く残したい方にもおすすめです。",
          "tag": "50CUT - 2衣装",
          "detail": {
            "heroImage": "plan-family-studio-et-hashima.jpg",
            "tagline": "家族みんなで一緒に撮影したい",
            "longDescription": "メインのお子様が2人以上の撮影プランです。\n衣装を2着まで着られるのが Family Plan の大きな特長。着物と洋装など、雰囲気の違う2パターンを1回の撮影で残せます。\nお子様1人でも、衣装を2着着たい方・カット数を多く残したい方には Family Plan がおすすめです（One Plan は20カット／衣装1着、Family Plan は50カット／衣装2着）。\n家族写真・ごきょうだい写真は追加料金なく撮影できます。\n\n753（3才・5才・7才）/ お宮参り / 100日祝 / ハーフバースデー / 1才バースデー / 2才以上のバースデー / 入園・入学 / ハーフ成人式 などの撮影メニューに対応しています。",
            "notes": "※メインのお子様が1人の場合は One Plan もお選びいただけます。衣装2着・50カットをご希望の方は Family Plan のご案内となります。\n※土日祝は +¥5,500 となります。\n※ご予約は1家族様1枠となります。2世帯で撮影されたい場合は2枠をご予約ください。\n※ご家族撮影の場合、ママのヘアセット1回分をサービスで承れます（ママがお着物の場合はヘアセットを承っておりません。撮影までに外部で着付け・ヘアセットのうえお越しください）。\n※お宮参りの産着レンタル：当日スタジオ撮影×外レンタル ¥11,000 / 別日外レンタルのみ ¥11,000"
          },
          "variants": [
            {
              "cuts": 50,
              "label": "Family Plan（50cut）",
              "price": "¥43,000",
              "duration": "",
              "description": "撮影料（お子様1名分）+ 撮影データ50cut + 衣装2着 / ヘアメイク（土日祝 +¥5,500）",
              "includes": [
                "撮影料（お子様1名分）",
                "編集済みデータ 50カット",
                "衣装2着（1着でも可）",
                "ヘアメイク",
                "家族撮影・きょうだい撮影 込み"
              ],
              "options": [
                {
                  "name": "撮影料（きょうだい・家族撮影で撮影に入るお子様1人追加につき）",
                  "price": "¥2,200"
                },
                {
                  "name": "753 撮影料金（753撮影料金カレンダーをご確認ください）",
                  "price": "¥6,600〜"
                },
                {
                  "name": "お宮参り撮影料金",
                  "price": "¥3,300"
                },
                {
                  "name": "ハーフ成人 撮影料金（女児）",
                  "price": "¥15,000"
                },
                {
                  "name": "ハーフ成人 撮影料金（男児）",
                  "price": "¥11,000"
                },
                {
                  "name": "et.Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                },
                {
                  "name": "Art photo coordinate 1パターン（瓶差し・髪飾り・ランドセルなど）",
                  "price": "¥18,000〜"
                },
                {
                  "name": "追加パターン（1パターンにつき）",
                  "price": "+¥9,000",
                  "sub": true
                },
                {
                  "name": "Art photo coordinate（空間装飾）",
                  "price": "¥28,000〜"
                },
                {
                  "name": "追加パターン（瓶差し・髪飾り・ランドセルなど）",
                  "price": "+¥9,000",
                  "sub": true
                }
              ],
              "gallery": [
                "goods-studio-et-hashima-02.jpg",
                "plan-family-gallery-studio-et-hashima-02.jpg",
                "plan-family-gallery-studio-et-hashima-03.jpg"
              ]
            }
          ]
        },
        {
          "key": "maternity",
          "name": "Maternity Plan",
          "desc": "「もうすぐ会える喜びを残したい」 ママの\"好き\"を詰め込めるマタニティプラン。",
          "tag": "20CUT - 衣装1〜2着",
          "detail": {
            "heroImage": "plan-maternity-studio-et-hashima.jpg",
            "tagline": "もうすぐ会える喜びを残したい",
            "longDescription": "ママの\"好き\"を詰め込めるマタニティプランです。\n撮影料・編集済みデータ20カット・マタニティ衣装1着〜2着・ヘアセットがセットになっています。",
            "notes": "※土日祝は +¥5,500 となります。\n※マタニティ衣装のインナーはご自身でご用意をお願いします。\n※表示価格はすべて税込です。\n※メイクはご自身でお願いしております。"
          },
          "variants": [
            {
              "cuts": 20,
              "label": "Maternity Plan（20cut）",
              "price": "¥45,000",
              "duration": "",
              "description": "撮影料 + 撮影データ20cut + マタニティ衣装1着〜2着 / ヘアセット（土日祝 +¥5,500）",
              "includes": [
                "撮影料",
                "編集済みデータ 20カット",
                "マタニティ衣装1着〜2着（インナーはご自身でご用意）",
                "ヘアセット"
              ],
              "options": [
                {
                  "name": "撮影料（撮影に入るお子様1人追加につき）",
                  "price": "¥2,200"
                },
                {
                  "name": "＋データ 5cut",
                  "price": "¥5,000"
                },
                {
                  "name": "＋データ 10cut（追加合計は10cutまで）",
                  "price": "¥9,000"
                },
                {
                  "name": "Flower Art（生花）1着",
                  "price": "¥5,500〜"
                },
                {
                  "name": "Flower Art（生花）2着",
                  "price": "¥8,800〜"
                },
                {
                  "name": "et. Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                }
              ],
              "gallery": [
                "plan-maternity-studio-et-hashima.jpg"
              ]
            }
          ]
        },
        {
          "key": "furisode",
          "name": "Furisode Plan",
          "desc": "「ハタチのあなたらしさを大切にしたい」 成人式の前撮り・後撮りプラン。et. だから残せる、新しい振袖写真の形です。",
          "tag": "10CUT - USB付き",
          "detail": {
            "heroImage": "plan-furisode-studio-et-hashima.jpg",
            "tagline": "ハタチのあなたらしさを大切にしたい",
            "longDescription": "成人式の前撮り・後撮りプランです。\n決まった従来の形より、ハタチのあなたらしさを大切にしたい。et. だから残せる、新しい振袖写真の形です。\n撮影料・編集済みデータ10カット（USB付き）がセットになっています。\n振袖のレンタル・着付け・ヘアセットは承っておりません。着付け・ヘアセットを済ませた状態でご来店ください。",
            "notes": "※土日祝は +¥5,500 となります。\n※衣装レンタルはございません。着付け・ヘアセットはすべて済ませた状態でご来店をお願いします。\n※表示価格はすべて税込です。"
          },
          "variants": [
            {
              "cuts": 10,
              "label": "Furisode Plan（10cut）",
              "price": "¥25,500",
              "duration": "",
              "description": "撮影料 + 撮影データ10cut（USB付き）（土日祝 +¥5,500）",
              "includes": [
                "撮影料",
                "編集済みデータ 10カット（USB付き）"
              ],
              "options": [
                {
                  "name": "5cut データ追加",
                  "price": "¥8,000"
                },
                {
                  "name": "10cut データ追加",
                  "price": "¥15,000"
                },
                {
                  "name": "兄弟撮影（撮影に入るお子様1人追加につき 撮影料 +¥2,200）",
                  "price": "¥5,500"
                },
                {
                  "name": "家族撮影（撮影に入るお子様1人追加につき 撮影料 +¥2,200）",
                  "price": "¥5,500"
                },
                {
                  "name": "Flower Art（生花）",
                  "price": "¥5,500〜"
                },
                {
                  "name": "et. Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                }
              ],
              "gallery": [
                "plan-furisode-studio-et-hashima.jpg"
              ]
            }
          ]
        }
      ],
      "goods": {
        "heading": "Goods",
        "body": "想い出を形に残せるオリジナルグッズをご用意しています。単品のほか、当日限定のお得なセットメニューもございます。\n※価格はすべて税込です。納期は写真決定から約2ヵ月後になります。",
        "items": [
          {
            "file": "goods-metal-photo-frame-studio-et-hashima-04.jpg",
            "name": "メタルフォトフレーム",
            "price": "¥9,900〜",
            "desc": "特殊表面処理されたアルミ製のメタル素材に転写印刷したフレーム。高い耐久性と、優れた発色・深みのある光沢感が特徴です。専用のアクリルスタンド付き。\n15Q(15.2×15.2cm) ¥9,900 ／ 17T(12.7×17.7cm) ¥9,900 ／ 25T(20.3×25.4cm) ¥14,900 ／ 35T(27.9×35.5cm) ¥19,900"
          },
          {
            "file": "goods-album-studio-et-hashima-05.jpg",
            "name": "アルバム",
            "price": "¥19,000〜",
            "desc": "飽きのこないシンプルなデザインと手に取りやすいサイズ感にこだわった一冊。ハードカバー仕様で専用ケース付き、表紙にお名前を入れることもできます。\nハーフレター(21.6×17.0cm) 10P ¥19,000 ／ 20P ¥23,000（20Pは50cut Plan限定）\nレター(28.8×22.4cm) 10P ¥34,800 ／ 20P ¥39,800（20Pは50cut Plan限定）\nオプション：ネーム入り ¥1,000"
          },
          {
            "file": "goods-key-ring-studio-et-hashima-06.jpg",
            "name": "キーリング",
            "price": "¥3,800〜",
            "desc": "イタリアから輸入した本革を使用し、写真フレームは一点ずつ削り出しました。お気に入りの一枚を入れたプレートを差し込んで、いつも持ち歩けます。\n全10色：Black／Milk／Cinnamon／Sakura／Momo／Cocoa／Caramel／Oimo／Maccha／Blueberry\n刻印なし ¥3,800 ／ 刻印あり ¥4,800（大文字アルファベット最大7文字・記号は「.」「&」が使用できます）"
          },
          {
            "file": "goods-usb-studio-et-hashima-07.jpg",
            "name": "USB（写真データ）",
            "price": "¥3,300",
            "desc": "ご購入いただいた写真データを1つにまとめて保管できます。飾りたくなる専用ケース付きなので、祖父母へのプレゼントにも。当日お渡しいたします。"
          },
          {
            "file": "goods-first-set-studio-et-hashima-08.jpg",
            "name": "First set",
            "price": "¥19,900",
            "desc": "想い出を3つのカタチに残せる、はじめての方におすすめなセット（¥2,000 off）。\n・メタルフォトフレーム【17T】1個\n・キーリング（刻印なし）2個\n・スライドショー"
          },
          {
            "file": "goods-decorate-set-studio-et-hashima-09.jpg",
            "name": "Decorate set",
            "price": "¥29,900",
            "desc": "大人気のメタルフォトフレームが3個ついた、お家に飾るセット（¥4,200 off）。\n・メタルフォトフレーム【15Q】【17T】から3個\n・スライドショー"
          },
          {
            "file": "goods-gift-set-studio-et-hashima-10.jpg",
            "name": "Gift set",
            "price": "¥39,900",
            "desc": "いまの姿をカタチに残して、プレゼントできるセット（¥4,200 off）。\n・メタルフォトフレーム【17T】1個\n・キーリング（刻印なし）4個\n・アルバム ハーフレター 10ページ"
          },
          {
            "file": "goods-treasure-set-studio-et-hashima-11.jpg",
            "name": "Treasure set",
            "price": "¥47,000",
            "desc": "あれもこれも悩んでしまう方の、とてもお得なセット（¥4,500 off）。\n・メタルフォトフレーム【17T】1個／【25T】1個\n・アルバム ハーフレター 10ページ\n・スライドショー\n・USB 1個"
          }
        ]
      },
      "calendar": {
        "heading": "Calendar",
        "body": "753撮影の料金カレンダーです。\nシーズンや曜日によって撮影料金が変動します。\n最新の空き状況は予約ページよりご確認ください。",
        "embedUrl": "",
        "note": "※A / B / C は753撮影料金の区分です。 / ※定休日：水曜・木曜 / 撮影は完全予約制となっております。 / ※年末年始（12/28〜1/4）は休業いたします。",
        "priceMap": {
          "2026-01": {
            "b": [
              5,
              6,
              9,
              16,
              19,
              20,
              23,
              26,
              27
            ],
            "c": [
              7,
              10,
              11,
              12,
              13,
              17,
              18,
              24,
              25,
              30,
              31
            ]
          },
          "2026-02": {
            "a": [
              2,
              3,
              6,
              9,
              12,
              16,
              17,
              20,
              24,
              27
            ],
            "b": [
              1,
              7,
              8,
              11,
              14,
              15,
              21,
              22,
              23,
              28
            ]
          },
          "2026-03": {
            "a": [
              2,
              3,
              6,
              9,
              10,
              13,
              16,
              17,
              23,
              24,
              27,
              30,
              31
            ],
            "b": [
              1,
              7,
              8,
              14,
              15,
              20,
              21,
              22,
              28,
              29
            ]
          },
          "2026-04": {
            "a": [
              3,
              6,
              7,
              10,
              13,
              14,
              17,
              20,
              21,
              24,
              27,
              28,
              30
            ],
            "b": [
              4,
              5,
              11,
              12,
              18,
              19,
              25,
              26,
              29
            ]
          },
          "2026-05": {
            "a": [
              11,
              12,
              15,
              18,
              19,
              22,
              25,
              26,
              29
            ],
            "b": [
              2,
              3,
              4,
              5,
              6,
              9,
              10,
              16,
              17,
              23,
              24,
              30,
              31
            ]
          },
          "2026-06": {
            "a": [
              1,
              2,
              5,
              8,
              9,
              12,
              15,
              16,
              19,
              22,
              23,
              26,
              29,
              30
            ],
            "b": [
              6,
              7,
              13,
              14,
              20,
              21,
              27,
              28
            ]
          },
          "2026-07": {
            "a": [
              3,
              6,
              7,
              10,
              13,
              14,
              17,
              21,
              24,
              27,
              28,
              31
            ],
            "b": [
              4,
              5,
              11,
              12,
              18,
              19,
              20,
              25,
              26
            ]
          },
          "2026-08": {
            "a": [
              3,
              4,
              7,
              10,
              14,
              17,
              18,
              21,
              24,
              25,
              28,
              31
            ],
            "b": [
              1,
              2,
              8,
              9,
              11,
              15,
              16,
              22,
              23,
              29,
              30
            ]
          },
          "2026-09": {
            "b": [
              1,
              4,
              5,
              7,
              8,
              11,
              12,
              16,
              17,
              19,
              26,
              28,
              29
            ],
            "c": [
              6,
              13,
              14,
              20,
              21,
              22,
              23,
              27
            ]
          },
          "2026-10": {
            "b": [
              5,
              7,
              16,
              20,
              23,
              24,
              26,
              27,
              30
            ],
            "c": [
              2,
              3,
              4,
              8,
              10,
              11,
              12,
              13,
              17,
              18,
              19,
              25,
              31
            ]
          },
          "2026-11": {
            "b": [
              2,
              9,
              13,
              17,
              20,
              24,
              27,
              30
            ],
            "c": [
              1,
              3,
              6,
              7,
              8,
              10,
              14,
              15,
              16,
              21,
              22,
              23,
              28,
              29
            ]
          },
          "2026-12": {
            "b": [
              1,
              7,
              10,
              14,
              18,
              22
            ],
            "c": [
              4,
              5,
              6,
              9,
              12,
              13,
              15,
              19,
              20,
              21,
              25,
              26,
              27
            ]
          }
        }
      },
      "reservation": {
        "heading": "Reservation",
        "body": "ご予約はSTORES予約（オンライン）にて承っております。\n753のお詣り日着物レンタルも受付中です。",
        "formUrl": "https://studio-et.stores.jp/reserve/hashima/733693",
        "note": "ご予約後、5営業日以内に確認のお電話を差し上げます。",
        "blocks": [
          {
            "mark": "A",
            "title": "撮影予約について",
            "bookingUrl": "https://studio-et.stores.jp/reserve/hashima/733693",
            "bookingLabel": "撮影のご予約はこちら",
            "plansUrl": "plans.html",
            "plansLabel": "撮影プラン・料金",
            "notes": [
              "ご予約はSTORES予約サイトで承ります。ご希望日時を選択後、撮影プラン（One / Family / Maternity / Furisode）と撮影メニュー（753・お宮参り・バースデー・入園入学など）をアンケート形式でお選びいただきます。",
              "予約受付：撮影日の3ヶ月前の20日 21:00 から、撮影日の12時間前まで。",
              "日程変更・キャンセルは予約日時の4日前まで、予約サイトからお手続きいただけます。",
              "ご予約後、5営業日以内に確認のお電話（050-1751-2601）を差し上げます。（水曜・木曜は定休日をいただいております）",
              "ご予約は1家族様1枠でお願いいたします。",
              {
                "text": "キャンセルポリシー",
                "sub": "ご予約後はキャンセルポリシーが適用されます。事前にご確認をお願いいたします。",
                "link": {
                  "href": "./cancel-policy.html",
                  "label": "キャンセルポリシーはこちら →"
                }
              }
            ]
          },
          {
            "mark": "B",
            "title": "753お詣り日予約について",
            "bookingUrl": "https://studio-et.stores.jp/reserve/hashima/2688037",
            "bookingLabel": "お詣り日のご予約はこちら",
            "plansUrl": "#omairi-plan",
            "plansLabel": "お詣りプラン・料金",
            "notes": [
              "スタジオ撮影×お詣り着物レンタルのセットプランです。スタジオ撮影日と神社へお詣りに行く日の2日間をご予約いただき、各日違うお着物をお選びいただけます。",
              "撮影がお済みでない方は、上記Aの撮影予約も併せてお取りください。（撮影予約は撮影日の3ヶ月前の20日 21:00 に受付開始）",
              "お詣り日予約の受付：2026年5月1日(金) 21:00 〜。予約サイトからは2026年9月〜12月のご予約が可能です。それ以外の日程はInstagram DM・LINEへお問い合わせください。",
              "お詣り日・対象スタジオ撮影期間：2026年4月1日〜2027年3月31日（前撮り・後撮りどちらも対象）。",
              "予約受付は24時間前まで。日程変更・キャンセルは予約日時の2日前まで、予約サイトからお手続きいただけます。",
              "お詣りに行かれる神社はお客様でお選びいただけます（神社へのスタッフ同行はありません）。お着物は当日ご来店時にお選びいただき、お出かけ当日17時までにスタジオへご返却をお願いします。"
            ]
          }
        ],
        "omairiPlan": {
          "title": "スタジオ撮影 × お詣り着物レンタルプラン",
          "description": "スタジオ撮影とお詣り着物レンタルがセットになった753お詣りプランです。\n撮影日とお詣り日でそれぞれお好きなお着物をお選びいただけます。\nお日にちの組み合わせ次第で料金が変わります。",
          "includes": "スタジオ撮影 / お着物2着 / 着付け2日分 / ヘアメイク2日分 / クリーニング込",
          "basePlan": "One plan（20cut） / Family plan（50cut）",
          "periods": [
            "2026年 4月〜9月",
            "2026年 10月〜12月",
            "2027年 1月〜3月"
          ],
          "rows": [
            {
              "label": "平日",
              "sublabel": "お子様1人追加料金",
              "prices": [
                "¥20,000 (¥18,000)",
                "¥24,000 (¥22,000)",
                "¥22,000 (¥20,000)"
              ]
            },
            {
              "label": "土日祝日大安",
              "sublabel": "お子様1人追加料金",
              "prices": [
                "¥25,000 (¥23,000)",
                "¥29,000 (¥27,000)",
                "¥27,000 (¥25,000)"
              ]
            }
          ],
          "example": "【お詣りセットプラン料金例】撮影5月平日／お詣り10月平日／お子様1人の場合：Family plan ¥43,000 + 753撮影料金 ¥6,600 + お詣り着物レンタル料金 ¥24,000 ＝ 合計 ¥73,600"
        }
      },
      "cancelPolicy": {
        "heading": "Cancellation Policy",
        "body": "撮影のご予約をいただいた後、キャンセルされる場合は下記の通り料金が発生いたします。\nご予約前に必ずご確認ください。",
        "items": [
          {
            "when": "予約日時の4日前まで",
            "fee": "無料（予約サイトから日程変更・キャンセル可能）"
          },
          {
            "when": "撮影日の2日前〜前日",
            "fee": "基本プラン料金の 50%"
          },
          {
            "when": "撮影日当日",
            "fee": "基本プラン料金の 100%"
          },
          {
            "when": "Art photo coordinate（撮影日の7日前から）",
            "fee": "オプション料金の半額（¥9,000〜）"
          }
        ],
        "note": "お客様都合のキャンセル（体調不良を含む）は、理由を問わずキャンセル料金の対象となります。撮影・et.Movieのキャンセルは、1ヶ月以内の空き枠で日程調整にご協力いただける場合、予約振替1回無料です。キャンセル料金は次回ご来店時のお支払い、または銀行振込（振込手数料はお客様ご負担）にてお願いいたします。"
      },
      "qa": {
        "heading": "Q & A",
        "body": "よくいただくご質問をまとめました。\nその他のご質問はお気軽にお問い合わせください。",
        "items": [
          {
            "q": "撮影時間はどれくらいですか？",
            "a": "撮影自体は約30〜90分が目安です（プランにより前後します）。ご来店からお帰りまでは2〜3時間ほどをみておいてください。お子さまの様子を見ながら柔軟に進めます。"
          },
          {
            "q": "兄弟での撮影は可能ですか？",
            "a": "可能です。ご予約時に人数をお知らせください。追加料金が発生する場合があります。"
          },
          {
            "q": "衣装は持ち込めますか？",
            "a": "はい、お気に入りの衣装をお持ち込みいただけます。スタジオの衣装と組み合わせることも可能です。"
          },
          {
            "q": "撮影データはいつ受け取れますか？",
            "a": "撮影当日にお渡しします。アルバムやフォトフレームは後日のお届けとなります。"
          },
          {
            "q": "雨天時はどうなりますか？",
            "a": "屋内スタジオでの撮影のため、天候に関わらず予定通り行えます。"
          },
          {
            "q": "駐車場はありますか？",
            "a": "スタジオ前にお客様専用駐車場をご用意しております。（駐車台数に限りがございます。）"
          },
          {
            "q": "お詣りの料金は撮影料金とは別ですか？",
            "a": "撮影料金（One Plan または Family Plan）＋ お詣り料金となります。両日のご予約をお願いいたします。"
          },
          {
            "q": "お詣り日の予約と撮影日の予約は両方必要ですか？",
            "a": "お詣りセットプランをご希望の場合は、お詣り日とスタジオ撮影日の2つご予約を取っていただく必要があります。<br>お詣り日のご予約はこちら → <a href=\"https://studio-et.stores.jp/reserve/hashima/2688037\" target=\"_blank\" rel=\"noopener\">お詣り日予約ページ</a><br>撮影のご予約はこちら → <a href=\"https://studio-et.stores.jp/reserve/hashima/733693\" target=\"_blank\" rel=\"noopener\">撮影予約ページ</a>"
          },
          {
            "q": "お詣りのロケ撮影はできますか？",
            "a": "基本的には神社へのスタッフの同行・撮影は行っておりません。ご希望の場合はお問い合わせください。"
          },
          {
            "q": "撮影はせず、お詣り日のレンタルのみはできますか？",
            "a": "可能です。ご希望の場合はお問い合わせください。"
          },
          {
            "q": "着物の返却は翌日に延長できますか？",
            "a": "着物の返却は当日の17時までにお願いいたします。1泊などの延長貸出しは行っておりません。渋滞などで返却が遅れそうな場合は必ずご連絡をお願いいたします。"
          },
          {
            "q": "日本髪のヘアセットは可能ですか？",
            "a": "日本髪 / 桃割れ のヘアセットは承っておりません。"
          },
          {
            "q": "髪飾りはありますか？",
            "a": "当店でご用意がございます。髪飾りのお持ち込みも可能です。"
          },
          {
            "q": "大人の着物着付け・ヘアセットは可能ですか？",
            "a": "大人の方の着付け・ヘアセットは承っておりません。\nご希望の場合は、撮影までにお着付け・ヘアセットを行ってからご来店ください。"
          }
        ]
      },
      "flow": {
        "heading": "Flow",
        "body": "ご予約から撮影、納品までの流れをご案内します。",
        "steps": [
          {
            "title": "Web予約（STORES予約）",
            "desc": "予約サイトでご希望日時を選択し、撮影プラン（One / Family / Maternity / Furisode）と撮影メニューをお選びください。",
            "note": "受付は撮影日の3ヶ月前の20日21:00から。"
          },
          {
            "title": "予約完了メール受信",
            "desc": "ご登録のメールアドレスに予約確認メールをお送りします。",
            "note": ""
          },
          {
            "title": "事前の電話確認",
            "desc": "撮影内容・衣装・ご希望のイメージなどを丁寧にヒアリングします。",
            "note": "ご予約後5営業日以内（水・木曜定休）"
          },
          {
            "title": "当日撮影",
            "desc": "リラックスした雰囲気の中で、お子さまの自然な表情を撮影します。",
            "note": ""
          },
          {
            "title": "当日データ納品",
            "desc": "撮影後はフォトグラファーがお写真のセレクト・編集を行い、撮影当日に編集済みデータをお渡しします（写真データはフォトグラファーがお選びします）。",
            "note": "スマホでお受け取りいただけます。データ容量に空きをご用意のうえご来店ください。アルバム・フォトフレームなどは後日納品。"
          }
        ]
      },
      "recruit": {
        "heading": "Recruit",
        "body": "現在、募集しておりません。",
        "positions": [],
        "contactEmail": "recruit@trunklii.com"
      },
      "ctaHeading": "今のあなたにいつでも会える。\nCelebrating you, my special, always.",
      "ctaNote": "ご予約・お問い合わせはお気軽に",
      "plansLead": "Studio et. の撮影は One / Family / Maternity / Furisode の4プランです。\n753・お宮参り・バースデー・入園入学などの撮影メニューは、One PlanとFamily Plan のどちらでもお選びいただけます。\n\n表示の料金は目安です。オプションや詳しいお見積り・ご不明点は、お気軽にお問い合わせください。"
    },
    "nr": {
      "key": "nr",
      "name": "Maison nr.",
      "shortName": "nr.",
      "tagline": "A new chapter begins",
      "description": "2026年10月1日 OPEN。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供する\nフォトスタジオです。",
      "accentColor": "#7a9e95",
      "address": "〒486-0806 愛知県春日井市大手田酉町1丁目5-9",
      "tel": "050-1732-9505",
      "hours": "受付 9:00–17:00 ／ 撮影 9:00–18:00（火・水曜定休）",
      "instagram": "https://www.instagram.com/maison_nr._/",
      "instagramHandle": "@maison_nr._",
      "mapUrl": "https://maps.google.com/?q=%E3%80%92486-0806%20%E6%84%9B%E7%9F%A5%E7%9C%8C%E6%98%A5%E6%97%A5%E4%BA%95%E5%B8%82%E5%A4%A7%E6%89%8B%E7%94%B0%E9%85%89%E7%94%BA1%E4%B8%81%E7%9B%AE5-9%20Maison%20nr.&ftid=0x6003734a78e48dbf:0x5816e7367a122c44",
      "bookingUrl": "https://www.instagram.com/maison_nr._/",
      "bookingLabel": "予約する",
      "comingSoon": false,
      "heroImages": [
        {
          "file": "maison-nr-kasugai-hero-pc-01.jpg",
          "alt": "Maison nr. 開業準備（PC） 1"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-02.jpg",
          "alt": "Maison nr. 開業準備（PC） 2"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-03.jpg",
          "alt": "Maison nr. 開業準備（PC） 3"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-04.jpg",
          "alt": "Maison nr. 開業準備（PC） 4"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-05.jpg",
          "alt": "Maison nr. 開業準備（PC） 5"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-06.jpg",
          "alt": "Maison nr. 開業準備（PC） 6"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-07.jpg",
          "alt": "Maison nr. 開業準備（PC） 7"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-08.jpg",
          "alt": "Maison nr. 開業準備（PC） 8"
        },
        {
          "file": "maison-nr-kasugai-hero-pc-09.jpg",
          "alt": "Maison nr. 開業準備（PC） 9"
        }
      ],
      "heroImagesSp": [
        {
          "file": "maison-nr-kasugai-hero-sp-01.jpg",
          "alt": "Maison nr. 開業準備 1"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-02.jpg",
          "alt": "Maison nr. 開業準備 2"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-03.jpg",
          "alt": "Maison nr. 開業準備 3"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-04.jpg",
          "alt": "Maison nr. 開業準備 4"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-05.jpg",
          "alt": "Maison nr. 開業準備 5"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-06.jpg",
          "alt": "Maison nr. 開業準備 6"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-07.jpg",
          "alt": "Maison nr. 開業準備 7"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-08.jpg",
          "alt": "Maison nr. 開業準備 8"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-09.jpg",
          "alt": "Maison nr. 開業準備 9"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-10.jpg",
          "alt": "Maison nr. 開業準備 10"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-11.jpg",
          "alt": "Maison nr. 開業準備 11"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-12.jpg",
          "alt": "Maison nr. 開業準備 12"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-13.jpg",
          "alt": "Maison nr. 開業準備 13"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-14.jpg",
          "alt": "Maison nr. 開業準備 14"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-15.jpg",
          "alt": "Maison nr. 開業準備 15"
        },
        {
          "file": "maison-nr-kasugai-hero-sp-16.jpg",
          "alt": "Maison nr. 開業準備 16"
        }
      ],
      "about": {
        "image": "photo-family-maison-nr-kasugai-01.jpg",
        "heading": "About Maison nr.",
        "body": "2026年10月1日 OPEN。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供するフォトスタジオです。\n\n詳細は2026年10月1日に公開予定です。"
      },
      "gallery": [
        {
          "file": "shichigosan-maison-nr-kasugai-01.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "shichigosan-maison-nr-kasugai-02.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "shichigosan-maison-nr-kasugai-03.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "photo-family-maison-nr-kasugai-01.jpg",
          "caption": "Family",
          "category": "family"
        }
      ],
      "kimono": {
        "heading": "Kimono",
        "body": "和裁士によるオートクチュールの、一点ものの着物を仕立てています。\n花飾りのヘアアレンジも含めたトータルコーディネートをご提供します。",
        "items": [
          {
            "file": "shichigosan-maison-nr-kasugai-01.jpg",
            "name": "着物 A",
            "desc": "古典柄",
            "category": "3y-girl"
          },
          {
            "file": "shichigosan-maison-nr-kasugai-02.jpg",
            "name": "着物 B",
            "desc": "花柄",
            "category": "3y-girl"
          },
          {
            "file": "shichigosan-maison-nr-kasugai-03.jpg",
            "name": "着物 C",
            "desc": "桜色",
            "category": "3y-girl"
          },
          {
            "file": "kimono-3yo-boy-maison-nr-kasugai-01.jpg",
            "name": "袴 A",
            "desc": "藍墨",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-maison-nr-kasugai-02.jpg",
            "name": "袴 B",
            "desc": "墨黒",
            "category": "3y-boy"
          },
          {
            "file": "kimono-3yo-boy-maison-nr-kasugai-03.jpg",
            "name": "袴 C",
            "desc": "茶系",
            "category": "3y-boy"
          },
          {
            "file": "kimono-5yo-boy-maison-nr-kasugai-01.jpg",
            "name": "袴 A",
            "desc": "古典柄",
            "category": "5y-boy"
          },
          {
            "file": "kimono-5yo-boy-maison-nr-kasugai-02.jpg",
            "name": "袴 B",
            "desc": "幾何柄",
            "category": "5y-boy"
          },
          {
            "file": "photo-family-maison-nr-kasugai-01.jpg",
            "name": "袴 C",
            "desc": "麻の葉",
            "category": "5y-boy"
          },
          {
            "file": "kimono-7yo-girl-maison-nr-kasugai-01.jpg",
            "name": "振袖 A",
            "desc": "赤地花柄",
            "category": "7y-girl"
          },
          {
            "file": "kimono-7yo-girl-maison-nr-kasugai-02.jpg",
            "name": "振袖 B",
            "desc": "金襴",
            "category": "7y-girl"
          },
          {
            "file": "kimono-7yo-girl-maison-nr-kasugai-03.jpg",
            "name": "振袖 C",
            "desc": "白地刺繍",
            "category": "7y-girl"
          },
          {
            "file": "kimono-10yo-girl-maison-nr-kasugai-01.jpg",
            "name": "振袖 A",
            "desc": "桃色",
            "category": "10y-girl"
          },
          {
            "file": "kimono-10yo-girl-maison-nr-kasugai-02.jpg",
            "name": "振袖 B",
            "desc": "青地",
            "category": "10y-girl"
          },
          {
            "file": "kimono-10yo-girl-maison-nr-kasugai-03.jpg",
            "name": "振袖 C",
            "desc": "白地",
            "category": "10y-girl"
          }
        ]
      },
      "costume": {
        "heading": "Costume",
        "body": "スタジオ独自にセレクトした衣装をご用意しています。\n洋装・和装どちらもご対応可能です。",
        "items": [
          {
            "file": "costume-dress-maison-nr-kasugai-01.jpg",
            "name": "Dress A",
            "desc": "クラシック・ホワイト"
          },
          {
            "file": "costume-dress-maison-nr-kasugai-02.jpg",
            "name": "Dress B",
            "desc": "ダスティ・ピンク"
          },
          {
            "file": "costume-dress-maison-nr-kasugai-03.jpg",
            "name": "Dress C",
            "desc": "ロイヤルブルー"
          }
        ]
      },
      "plans": [
        {
          "key": "birthday",
          "name": "Birthday Plan",
          "desc": "1歳のバースデーフォト。",
          "tag": "",
          "detail": null,
          "variants": []
        },
        {
          "key": "753",
          "name": "753 Plan",
          "desc": "七五三の晴れ姿を。",
          "tag": "",
          "detail": null,
          "variants": []
        },
        {
          "key": "family",
          "name": "Family Plan",
          "desc": "家族みんなで残す一瞬のポートレート。",
          "tag": "",
          "detail": null,
          "variants": []
        },
        {
          "key": "maternity",
          "name": "Maternity Plan",
          "desc": "特別な時間を永遠に。",
          "tag": "",
          "detail": null,
          "variants": []
        }
      ],
      "goods": {
        "heading": "Goods",
        "body": "想い出を形に残せるオリジナルグッズをご用意しています。",
        "items": [
          {
            "file": "kimono-3yo-boy-maison-nr-kasugai-03.jpg",
            "name": "アルバム",
            "price": "¥22,000〜",
            "desc": "厳選した写真を一冊に。"
          },
          {
            "file": "photo-family-maison-nr-kasugai-01.jpg",
            "name": "フォトフレーム",
            "price": "¥8,800〜",
            "desc": "お気に入りの一枚を飾って。"
          },
          {
            "file": "kimono-10yo-girl-maison-nr-kasugai-03.jpg",
            "name": "データUSB",
            "price": "¥5,500〜",
            "desc": "編集済みデータを全て保存してお渡しします（One Plan 20カット〜 / Family Plan 50カット〜）。"
          }
        ]
      },
      "calendar": {
        "heading": "Calendar",
        "body": "七五三撮影の料金カレンダーです。\nシーズンや曜日によって撮影料金が変動します。\n最新の空き状況は予約ページよりご確認ください。",
        "embedUrl": "",
        "note": "※A / B / C は753撮影料金の区分です。 / ※年末年始（12/28〜1/4）は休業いたします。"
      },
      "reservation": {
        "heading": "Reservation",
        "body": "予約受付は2026年10月1日に開始予定です。",
        "formUrl": "",
        "note": ""
      },
      "cancelPolicy": {
        "heading": "Cancellation Policy",
        "body": "キャンセルポリシーの詳細は2026年10月1日に公開予定です。",
        "items": [],
        "note": ""
      },
      "qa": {
        "heading": "Q & A",
        "body": "よくいただくご質問は2026年10月1日に公開予定です。",
        "items": []
      },
      "flow": {
        "heading": "Flow",
        "body": "ご予約から撮影、納品までの流れをご案内します。",
        "steps": [
          {
            "title": "Web予約",
            "desc": "公式サイトより撮影プランをお選びいただき、ご希望日時をご予約ください。",
            "note": ""
          },
          {
            "title": "予約完了メール受信",
            "desc": "ご登録のメールアドレスに予約確認メールをお送りします。",
            "note": ""
          },
          {
            "title": "事前の電話カウンセリング",
            "desc": "撮影内容・衣装・ご希望のイメージなどを丁寧にヒアリングします。",
            "note": "予約後5営業日以内"
          },
          {
            "title": "当日撮影",
            "desc": "リラックスした雰囲気の中で、お子さまの自然な表情を撮影します。",
            "note": ""
          },
          {
            "title": "当日データ納品",
            "desc": "撮影後はフォトグラファーがお写真のセレクト・編集を行い、撮影当日に編集済みデータをお渡しします（写真データはフォトグラファーがお選びします）。",
            "note": "スマホでお受け取りいただけます。データ容量に空きをご用意のうえご来店ください。アルバム・フォトフレームなどは後日納品。"
          }
        ]
      },
      "recruit": {
        "heading": "Recruit",
        "body": "現在、募集しておりません。",
        "positions": [],
        "contactEmail": "recruit@trunklii.com"
      },
      "ctaHeading": "2026年10月1日 OPEN。\nお楽しみに。",
      "ctaNote": "最新情報はInstagramで"
    }
  }
};
