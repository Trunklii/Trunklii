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
        "intro": "七五三の撮影について、いくつかお伺いします。概算のお見積りをご案内します。",
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
                "label": "七五三ピーク（9〜11月）"
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
            "label": "七五三ピーク",
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
      "description": "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、七五三・ニューボーン・バースデーなど\n大切な記念日を美しい写真に残します。",
      "accentColor": "#b8935a",
      "address": "〒501-6253 岐阜県羽島市小熊町島新道76-9 2階",
      "tel": "050-1751-2601",
      "hours": "10:00 – 18:00（火曜定休）",
      "instagram": "https://www.instagram.com/studio_et._",
      "instagramHandle": "@studio_et._",
      "mapUrl": "https://goo.gl/maps/ZVSCkidKRbLqAvU19",
      "bookingUrl": "https://studio-et.stores.jp/reserve/hashima/733693",
      "bookingLabel": "予約する",
      "comingSoon": false,
      "heroImages": [
        {
          "file": "hero-pc-02.jpg",
          "alt": "Studio et. hero（PC） 2"
        },
        {
          "file": "hero-pc-03.jpg",
          "alt": "Studio et. hero（PC） 3"
        },
        {
          "file": "hero-pc-04.jpg",
          "alt": "Studio et. hero（PC） 4"
        },
        {
          "file": "hero-pc-05.jpg",
          "alt": "Studio et. hero（PC） 5"
        },
        {
          "file": "hero-pc-06.jpg",
          "alt": "Studio et. hero（PC） 6"
        },
        {
          "file": "hero-pc-07.jpg",
          "alt": "Studio et. hero（PC） 7"
        },
        {
          "file": "hero-pc-01.jpg",
          "alt": "Studio et. hero（PC） 1"
        }
      ],
      "heroImagesSp": [
        {
          "file": "hero-sp-02.jpg",
          "alt": "Studio et. hero（スマホ） 2"
        },
        {
          "file": "hero-sp-03.jpg",
          "alt": "Studio et. hero（スマホ） 3"
        },
        {
          "file": "hero-sp-04.jpg",
          "alt": "Studio et. hero（スマホ） 4"
        },
        {
          "file": "hero-sp-05.jpg",
          "alt": "Studio et. hero（スマホ） 5"
        },
        {
          "file": "hero-sp-06.jpg",
          "alt": "Studio et. hero（スマホ） 6"
        },
        {
          "file": "hero-sp-07.jpg",
          "alt": "Studio et. hero（スマホ） 7"
        },
        {
          "file": "hero-sp-08.jpg",
          "alt": "Studio et. hero（スマホ） 8"
        },
        {
          "file": "hero-sp-09.jpg",
          "alt": "Studio et. hero（スマホ） 9"
        },
        {
          "file": "hero-sp-10.jpg",
          "alt": "Studio et. hero（スマホ） 10"
        },
        {
          "file": "hero-sp-11.jpg",
          "alt": "Studio et. hero（スマホ） 11"
        },
        {
          "file": "hero-sp-01.jpg",
          "alt": "Studio et. hero（スマホ） 1"
        }
      ],
      "about": {
        "image": "18295179019220181.jpg",
        "heading": "About Studio et.",
        "body": "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、七五三・ニューボーン・バースデーなど\n大切な記念日を美しい写真に残します。\n\n一つひとつのお花から、衣装、ヘアメイク、撮影まで\nすべてをスタジオにてご提供しています。"
      },
      "gallery": [
        {
          "file": "18505164388065081.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18417574654096276.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18387950968193350.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18384987919132419.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18375330547181332.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18364722763198059.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18335184631230617.jpg",
          "caption": "Newborn",
          "category": "newborn"
        },
        {
          "file": "18334778899231083.jpg",
          "caption": "Birthday",
          "category": "birthday"
        },
        {
          "file": "18303974821264064.jpg",
          "caption": "Family",
          "category": "family"
        },
        {
          "file": "18295179019220181.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18294900103268494.jpg",
          "caption": "Newborn",
          "category": "newborn"
        },
        {
          "file": "18282725923278968.jpg",
          "caption": "Birthday",
          "category": "birthday"
        },
        {
          "file": "18273705787256865.jpg",
          "caption": "Maternity",
          "category": "maternity"
        },
        {
          "file": "625012292_18073272839576495_2638135942964414464_n.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "17842722768624869.jpg",
          "caption": "Birthday",
          "category": "birthday"
        },
        {
          "file": "img-10dbc78249.jpg",
          "caption": "753-姉妹兄弟写真",
          "category": "newborn"
        },
        {
          "file": "img-7d17fd493b.jpg",
          "caption": "753-5歳-男の子",
          "category": "other"
        }
      ],
      "kimono": {
              "heading": "Kimono",
              "body": "厳選された着物をスタジオにてご用意。\n花飾りのヘアアレンジも含めたトータルコーディネートをご提供します。",
              "items": [
                      {
                              "file": "kimono-3g-01.jpg",
                              "name": "三歳女の子 01",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-02.jpg",
                              "name": "三歳女の子 02",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-03.jpg",
                              "name": "三歳女の子 03",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-04.jpg",
                              "name": "三歳女の子 04",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-05.jpg",
                              "name": "三歳女の子 05",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-06.jpg",
                              "name": "三歳女の子 06",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-07.jpg",
                              "name": "三歳女の子 07",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-08.jpg",
                              "name": "三歳女の子 08",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3b-01.jpg",
                              "name": "三歳男の子 01",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-02.jpg",
                              "name": "三歳男の子 02",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-03.jpg",
                              "name": "三歳男の子 03",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-04.jpg",
                              "name": "三歳男の子 04",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-05.jpg",
                              "name": "三歳男の子 05",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-06.jpg",
                              "name": "三歳男の子 06",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-07.jpg",
                              "name": "三歳男の子 07",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-08.jpg",
                              "name": "三歳男の子 08",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-09.jpg",
                              "name": "三歳男の子 09",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-3b-10.jpg",
                              "name": "三歳男の子 10",
                              "desc": "",
                              "category": "3y-boy"
                      },
                      {
                              "file": "kimono-5b-01.jpg",
                              "name": "五歳男の子 01",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-02.jpg",
                              "name": "五歳男の子 02",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-03.jpg",
                              "name": "五歳男の子 03",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-04.jpg",
                              "name": "五歳男の子 04",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-05.jpg",
                              "name": "五歳男の子 05",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-06.jpg",
                              "name": "五歳男の子 06",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-5b-07.jpg",
                              "name": "五歳男の子 07",
                              "desc": "",
                              "category": "5y-boy"
                      },
                      {
                              "file": "kimono-7g-01.jpg",
                              "name": "七歳女の子 01",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-02.jpg",
                              "name": "七歳女の子 02",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-03.jpg",
                              "name": "七歳女の子 03",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-04.jpg",
                              "name": "七歳女の子 04",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-05.jpg",
                              "name": "七歳女の子 05",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-06.jpg",
                              "name": "七歳女の子 06",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-07.jpg",
                              "name": "七歳女の子 07",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-7g-08.jpg",
                              "name": "七歳女の子 08",
                              "desc": "",
                              "category": "7y-girl"
                      },
                      {
                              "file": "kimono-10g-01.jpg",
                              "name": "十歳女の子 01",
                              "desc": "",
                              "category": "10y-girl"
                      },
                      {
                              "file": "kimono-10g-02.jpg",
                              "name": "十歳女の子 02",
                              "desc": "",
                              "category": "10y-girl"
                      },
                      {
                              "file": "kimono-10g-03.jpg",
                              "name": "十歳女の子 03",
                              "desc": "",
                              "category": "10y-girl"
                      },
                      {
                              "file": "kimono-3g-09.jpg",
                              "name": "三歳女の子 チュール 01",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-3g-10.jpg",
                              "name": "三歳女の子 チュール 02",
                              "desc": "",
                              "category": "3y-girl"
                      },
                      {
                              "file": "kimono-10b-01.jpg",
                              "name": "十歳男の子 01",
                              "desc": "",
                              "category": "10y-boy"
                      },
                      {
                              "file": "kimono-om-01.jpg",
                              "name": "お宮参り 01",
                              "desc": "",
                              "category": "omairi"
                      },
                      {
                              "file": "kimono-om-02.jpg",
                              "name": "お宮参り 02",
                              "desc": "",
                              "category": "omairi"
                      },
                      {
                              "file": "kimono-om-03.jpg",
                              "name": "お宮参り 03",
                              "desc": "",
                              "category": "omairi"
                      }
              ]
      },
      "costume": {
        "heading": "Costume",
        "body": "スタジオ独自にセレクトした衣装をご用意しています。\n洋装・和装どちらもご対応可能です。",
        "items": [
          {
            "file": "18505164388065081.jpg",
            "name": "Dress A",
            "desc": "ホワイトチュールドレス"
          },
          {
            "file": "18417574654096276.jpg",
            "name": "Dress B",
            "desc": "ピンクフローラルドレス"
          },
          {
            "file": "18387950968193350.jpg",
            "name": "Dress C",
            "desc": "ブルーシルクドレス"
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
            "heroImage": "18334778899231083.jpg",
            "tagline": "ちょっと気軽に \"いま\" を残したい",
            "longDescription": "メインのお子様1人のプランです。\n撮影料・編集済みデータ20カット・衣装1着・ヘアメイクがセットになっています。\nオプションで家族撮影・きょうだい撮影を追加できます。\n\n753（3才・5才・7才）/ お宮参り / 100日祝 / ハーフバースデー / 1才バースデー / 2才以上のバースデー / 入園・入学 / ハーフ成人式 などの撮影メニューに対応しています。",
            "notes": "※土日祝は +¥5,500 となります。\n※メインのお子様が2人以上の場合は Family Plan をお選びください。\n※ご予約は1家族様1枠（1親等まで）となります。\n※お宮参りの産着レンタル：当日スタジオ撮影×外レンタル ¥11,000 / 別日外レンタルのみ ¥11,000"
          },
          "variants": [
            {
              "cuts": 20,
              "label": "One Plan（20cut）",
              "price": "¥25,000",
              "duration": "",
              "description": "撮影料 + 撮影データ20cut + 衣装1着 / ヘアメイク（土日祝 +¥5,500）",
              "includes": [
                "撮影料",
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
                  "name": "Art photo coordinate（瓶差し・髪飾り・ランドセルなど）",
                  "price": "¥18,000〜"
                },
                {
                  "name": "Art photo coordinate（空間装飾）",
                  "price": "¥28,000〜"
                },
                {
                  "name": "Art photo coordinate（空間装飾＋髪飾り）",
                  "price": "¥37,000〜"
                }
              ],
              "gallery": [
                "18334778899231083.jpg",
                "AA-18103506649752477.jpg",
                "18387950968193350.jpg"
              ]
            }
          ]
        },
        {
          "key": "family",
          "name": "Family Plan",
          "desc": "「家族みんなで一緒に撮影したい」 メインのお子様1人以上のプラン。家族撮影・きょうだい撮影は基本料金に含まれます。",
          "tag": "50CUT - 2衣装",
          "detail": {
            "heroImage": "18303974821264064.jpg",
            "tagline": "家族みんなで一緒に撮影したい",
            "longDescription": "メインのお子様1人以上の撮影プランです。\n衣装を2着まで着られるのも Family Plan の特長です。\n家族写真・ごきょうだい写真は追加料金なく撮影できます。\n\n753（3才・5才・7才）/ お宮参り / 100日祝 / ハーフバースデー / 1才バースデー / 2才以上のバースデー / 入園・入学 / ハーフ成人式 などの撮影メニューに対応しています。",
            "notes": "※土日祝は +¥5,500 となります。\n※ご予約は1家族様1枠（1親等まで）となります。\n※ご家族撮影の場合、ママのヘアセット1回分をサービスで承れます（ママがお着物の場合はヘアセットを承っておりません。撮影までに外部で着付け・ヘアセットのうえお越しください）。\n※お宮参りの産着レンタル：当日スタジオ撮影×外レンタル ¥11,000 / 別日外レンタルのみ ¥11,000"
          },
          "variants": [
            {
              "cuts": 50,
              "label": "Family Plan（50cut）",
              "price": "¥43,000",
              "duration": "",
              "description": "撮影料（お子様1人分）+ 撮影データ50cut + 衣装1着〜2着 / ヘアメイク（土日祝 +¥5,500）",
              "includes": [
                "撮影料（お子様1人分）",
                "編集済みデータ 50カット",
                "衣装1着〜2着",
                "ヘアメイク",
                "家族撮影・きょうだい撮影 込み"
              ],
              "options": [
                {
                  "name": "撮影料（撮影に入るお子様1人追加につき）",
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
                  "name": "Art photo coordinate（瓶差し・髪飾り・ランドセルなど）",
                  "price": "¥18,000〜"
                },
                {
                  "name": "Art photo coordinate（空間装飾）",
                  "price": "¥28,000〜"
                },
                {
                  "name": "Art photo coordinate（空間装飾＋髪飾り）",
                  "price": "¥37,000〜"
                }
              ],
              "gallery": [
                "18303974821264064.jpg",
                "AA-18116290120491565.jpg",
                "18364722763198059.jpg"
              ]
            }
          ]
        },
        {
          "key": "maternity",
          "name": "Maternity Plan",
          "desc": "「もうすぐ会える喜びを残したい」 ママの\"好き\"を詰め込めるマタニティプラン。",
          "tag": "20cut",
          "detail": {
            "heroImage": "18273705787256865.jpg",
            "tagline": "もうすぐ会える喜びを残したい",
            "longDescription": "ママの\"好き\"を詰め込めるマタニティプランです。\n撮影料・編集済みデータ20カット・マタニティ衣装1着〜2着・ヘアセットがセットになっています。",
            "notes": "※土日祝は +¥5,500 となります。\n※マタニティ衣装のインナーはご自身でご用意をお願いします。\n※料金の詳細は、お電話・Instagram DM・LINE にてお気軽にお問い合わせください。"
          },
          "variants": [
            {
              "cuts": 20,
              "label": "Maternity Plan（20cut）",
              "price": "お問い合わせ",
              "duration": "",
              "description": "撮影料 + 撮影データ20cut + マタニティ衣装1着〜2着 / ヘアセット（土日祝 +¥5,500）",
              "includes": [
                "撮影料",
                "編集済みデータ 20カット",
                "マタニティ衣装1着〜2着",
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
                  "name": "Flower Art（生花）",
                  "price": "¥5,500〜"
                },
                {
                  "name": "et.Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                }
              ],
              "gallery": [
                "18273705787256865.jpg"
              ]
            }
          ]
        },
        {
          "key": "furisode",
          "name": "Furisode Plan",
          "desc": "「ハタチの輝きをわたしらしく残したい」 成人式の前撮り・後撮りプラン。振袖だけでなく、袴やスーツの撮影も可能です。",
          "tag": "20cut",
          "detail": {
            "heroImage": "plan-furisode-01.jpg",
            "tagline": "ハタチの輝きをわたしらしく残したい",
            "longDescription": "成人式の前撮り・後撮りプランです。\n振袖だけでなく、袴やスーツでの撮影も可能です。",
            "notes": "※土日祝は +¥5,500 となります。\n※プラン内容・料金の詳細は、お電話・Instagram DM・LINE にてお気軽にお問い合わせください。"
          },
          "variants": [
            {
              "cuts": 20,
              "label": "Furisode Plan（20cut）",
              "price": "お問い合わせ",
              "duration": "",
              "description": "撮影料 + 撮影データ20cut（土日祝 +¥5,500）",
              "includes": [
                "撮影料",
                "編集済みデータ 20カット"
              ],
              "options": [
                {
                  "name": "Flower Art（生花）",
                  "price": "¥5,500〜"
                },
                {
                  "name": "et.Movie（約3分 / 撮影日の2週間前までにご予約ください）",
                  "price": "¥28,000"
                }
              ],
              "gallery": [
                "plan-furisode-01.jpg"
              ]
            }
          ]
        }
      ],
      "goods": {
        "heading": "Goods",
        "body": "撮影と一緒にお選びいただけるオリジナルグッズをご用意しています。",
        "items": [
          {
            "file": "18335184631230617.jpg",
            "name": "アルバム",
            "price": "¥22,000〜",
            "desc": "厳選した写真を一冊に。"
          },
          {
            "file": "18303974821264064.jpg",
            "name": "フォトフレーム",
            "price": "¥8,800〜",
            "desc": "お気に入りの一枚を飾って。"
          },
          {
            "file": "17842722768624869.jpg",
            "name": "データUSB",
            "price": "¥5,500〜",
            "desc": "全データを記念にお持ち帰り。"
          }
        ]
      },
      "calendar": {
        "heading": "Calendar",
        "body": "撮影可能日のご案内です。\n最新の空き状況は予約ページよりご確認ください。",
        "embedUrl": "",
        "note": "※定休日：火曜日 / 撮影は完全予約制となっております。"
      },
      "reservation": {
        "heading": "Reservation",
        "body": "ご予約はSTORES予約（オンライン）またはお電話・SNSで承っております。\n七五三のお詣り日着物レンタルも受付中です。",
        "formUrl": "https://studio-et.stores.jp/reserve/hashima/733693",
        "note": "ご予約後、10営業日以内に確認のお電話を差し上げます。",
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
              "ご予約後、10営業日以内に確認のお電話（050-1751-2601）を差し上げます。（水曜・木曜は定休日をいただいております）",
              "ご予約は1家族様1枠でお願いいたします。",
              "電話やInstagram・LINEでのご予約・ご相談も受付しております。いつでもお気軽にご連絡ください。",
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
              "お詣り日予約の受付：2026年5月1日(金) 21:00 〜。予約サイトからは2026年9月〜12月のご予約が可能です。それ以外の日程はお電話・Instagram DM・LINEへお問い合わせください。",
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
            "a": "プランによりますが、約60〜90分が目安です。お子さまの様子を見ながら柔軟に進めます。"
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
            "a": "スタジオ前に2台分のお客様専用駐車場をご用意しております。"
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
            "note": "受付は撮影日の3ヶ月前の20日21:00から。電話・Instagram DM・LINEでのご予約も可能です"
          },
          {
            "title": "予約完了メール受信",
            "desc": "ご登録のメールアドレスに予約確認メールをお送りします。",
            "note": ""
          },
          {
            "title": "事前の電話確認",
            "desc": "撮影内容・衣装・ご希望のイメージなどを丁寧にヒアリングします。",
            "note": "ご予約後10営業日以内（水・木曜定休）"
          },
          {
            "title": "当日撮影",
            "desc": "リラックスした雰囲気の中で、お子さまの自然な表情を撮影します。",
            "note": ""
          },
          {
            "title": "当日データ納品",
            "desc": "撮影当日に編集済みデータをお渡しします。",
            "note": "アルバムやフォトフレームなどは後日納品"
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
      "plansLead": "Studio et. の撮影は One / Family / Maternity / Furisode の4プランです。\n753・お宮参り・バースデー・入園入学などの撮影メニューは、One PlanとFamily Plan のどちらでもお選びいただけます。"
    },
    "nr": {
      "key": "nr",
      "name": "Maison nr.",
      "shortName": "nr.",
      "tagline": "A new chapter begins",
      "description": "まもなくオープン。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供する\nフォトスタジオです。",
      "accentColor": "#7a9e95",
      "address": "〒486-0806 愛知県春日井市大手田酉町1丁目5-9",
      "tel": "050-1751-2601",
      "hours": "詳細は近日公開",
      "instagram": "https://www.instagram.com/maison_nr._",
      "instagramHandle": "@maison_nr._",
      "mapUrl": "https://maps.app.goo.gl/gF8j4TbvhNziwHFd6",
      "bookingUrl": "https://nr.trunklii.com/reservation",
      "bookingLabel": "予約する",
      "comingSoon": false,
      "heroImages": [
        {
          "file": "nr-hero-pc-01.jpg",
          "alt": "Maison nr. 開業準備（PC） 1"
        },
        {
          "file": "nr-hero-pc-02.jpg",
          "alt": "Maison nr. 開業準備（PC） 2"
        },
        {
          "file": "nr-hero-pc-03.jpg",
          "alt": "Maison nr. 開業準備（PC） 3"
        },
        {
          "file": "nr-hero-pc-04.jpg",
          "alt": "Maison nr. 開業準備（PC） 4"
        },
        {
          "file": "nr-hero-pc-05.jpg",
          "alt": "Maison nr. 開業準備（PC） 5"
        },
        {
          "file": "nr-hero-pc-06.jpg",
          "alt": "Maison nr. 開業準備（PC） 6"
        },
        {
          "file": "nr-hero-pc-07.jpg",
          "alt": "Maison nr. 開業準備（PC） 7"
        },
        {
          "file": "nr-hero-pc-08.jpg",
          "alt": "Maison nr. 開業準備（PC） 8"
        },
        {
          "file": "nr-hero-pc-09.jpg",
          "alt": "Maison nr. 開業準備（PC） 9"
        }
      ],
      "heroImagesSp": [
        {
          "file": "nr-hero-01.jpg",
          "alt": "Maison nr. 開業準備 1"
        },
        {
          "file": "nr-hero-02.jpg",
          "alt": "Maison nr. 開業準備 2"
        },
        {
          "file": "nr-hero-03.jpg",
          "alt": "Maison nr. 開業準備 3"
        },
        {
          "file": "nr-hero-04.jpg",
          "alt": "Maison nr. 開業準備 4"
        },
        {
          "file": "nr-hero-05.jpg",
          "alt": "Maison nr. 開業準備 5"
        },
        {
          "file": "nr-hero-06.jpg",
          "alt": "Maison nr. 開業準備 6"
        },
        {
          "file": "nr-hero-07.jpg",
          "alt": "Maison nr. 開業準備 7"
        },
        {
          "file": "nr-hero-08.jpg",
          "alt": "Maison nr. 開業準備 8"
        },
        {
          "file": "nr-hero-09.jpg",
          "alt": "Maison nr. 開業準備 9"
        },
        {
          "file": "nr-hero-10.jpg",
          "alt": "Maison nr. 開業準備 10"
        },
        {
          "file": "nr-hero-11.jpg",
          "alt": "Maison nr. 開業準備 11"
        },
        {
          "file": "nr-hero-12.jpg",
          "alt": "Maison nr. 開業準備 12"
        },
        {
          "file": "nr-hero-13.jpg",
          "alt": "Maison nr. 開業準備 13"
        },
        {
          "file": "nr-hero-14.jpg",
          "alt": "Maison nr. 開業準備 14"
        },
        {
          "file": "nr-hero-15.jpg",
          "alt": "Maison nr. 開業準備 15"
        },
        {
          "file": "nr-hero-16.jpg",
          "alt": "Maison nr. 開業準備 16"
        }
      ],
      "about": {
        "image": "18303974821264064.jpg",
        "heading": "About Maison nr.",
        "body": "まもなくオープン。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供するフォトスタジオです。\n\n詳細は近日公開予定です。"
      },
      "gallery": [
        {
          "file": "18505164388065081.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18417574654096276.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18387950968193350.jpg",
          "caption": "Shichi-Go-San",
          "category": "753"
        },
        {
          "file": "18335184631230617.jpg",
          "caption": "Newborn",
          "category": "newborn"
        },
        {
          "file": "18303974821264064.jpg",
          "caption": "Family",
          "category": "family"
        },
        {
          "file": "18294900103268494.jpg",
          "caption": "Newborn",
          "category": "newborn"
        }
      ],
      "kimono": {
        "heading": "Kimono",
        "body": "厳選された着物をスタジオにてご用意。\n花飾りのヘアアレンジも含めたトータルコーディネートをご提供します。",
        "items": [
          {
            "file": "18505164388065081.jpg",
            "name": "着物 A",
            "desc": "古典柄",
            "category": "3y-girl"
          },
          {
            "file": "18417574654096276.jpg",
            "name": "着物 B",
            "desc": "花柄",
            "category": "3y-girl"
          },
          {
            "file": "18387950968193350.jpg",
            "name": "着物 C",
            "desc": "桜色",
            "category": "3y-girl"
          },
          {
            "file": "18375330547181332.jpg",
            "name": "袴 A",
            "desc": "藍墨",
            "category": "3y-boy"
          },
          {
            "file": "18384987919132419.jpg",
            "name": "袴 B",
            "desc": "墨黒",
            "category": "3y-boy"
          },
          {
            "file": "18335184631230617.jpg",
            "name": "袴 C",
            "desc": "茶系",
            "category": "3y-boy"
          },
          {
            "file": "18334778899231083.jpg",
            "name": "袴 A",
            "desc": "古典柄",
            "category": "5y-boy"
          },
          {
            "file": "18345676999087256.jpg",
            "name": "袴 B",
            "desc": "幾何柄",
            "category": "5y-boy"
          },
          {
            "file": "18303974821264064.jpg",
            "name": "袴 C",
            "desc": "麻の葉",
            "category": "5y-boy"
          },
          {
            "file": "18364722763198059.jpg",
            "name": "振袖 A",
            "desc": "赤地花柄",
            "category": "7y-girl"
          },
          {
            "file": "18295179019220181.jpg",
            "name": "振袖 B",
            "desc": "金襴",
            "category": "7y-girl"
          },
          {
            "file": "18294900103268494.jpg",
            "name": "振袖 C",
            "desc": "白地刺繍",
            "category": "7y-girl"
          },
          {
            "file": "18282725923278968.jpg",
            "name": "振袖 A",
            "desc": "桃色",
            "category": "10y-girl"
          },
          {
            "file": "18273705787256865.jpg",
            "name": "振袖 B",
            "desc": "青地",
            "category": "10y-girl"
          },
          {
            "file": "17842722768624869.jpg",
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
            "file": "AA-17856884340522635.jpg",
            "name": "Dress A",
            "desc": "クラシック・ホワイト"
          },
          {
            "file": "AA-18103506649752477.jpg",
            "name": "Dress B",
            "desc": "ダスティ・ピンク"
          },
          {
            "file": "AA-18116290120491565.jpg",
            "name": "Dress C",
            "desc": "ロイヤルブルー"
          }
        ]
      },
      "plans": [
        {
          "key": "newborn",
          "name": "Newborn Plan",
          "desc": "生後3週間以内の新生児撮影。",
          "tag": "",
          "detail": null,
          "variants": []
        },
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
        "body": "撮影と一緒にお選びいただけるオリジナルグッズをご用意しています。",
        "items": [
          {
            "file": "18335184631230617.jpg",
            "name": "アルバム",
            "price": "¥22,000〜",
            "desc": "厳選した写真を一冊に。"
          },
          {
            "file": "18303974821264064.jpg",
            "name": "フォトフレーム",
            "price": "¥8,800〜",
            "desc": "お気に入りの一枚を飾って。"
          },
          {
            "file": "17842722768624869.jpg",
            "name": "データUSB",
            "price": "¥5,500〜",
            "desc": "全データを記念にお持ち帰り。"
          }
        ]
      },
      "calendar": {
        "heading": "Calendar",
        "body": "撮影可能日は近日公開予定です。",
        "embedUrl": "",
        "note": ""
      },
      "reservation": {
        "heading": "Reservation",
        "body": "予約受付は近日開始予定です。",
        "formUrl": "",
        "note": ""
      },
      "cancelPolicy": {
        "heading": "Cancellation Policy",
        "body": "キャンセルポリシーの詳細は近日公開予定です。",
        "items": [],
        "note": ""
      },
      "qa": {
        "heading": "Q & A",
        "body": "よくいただくご質問は近日公開予定です。",
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
            "desc": "撮影当日に編集済みデータをお渡しします。",
            "note": "アルバムやフォトフレームなどは後日納品"
          }
        ]
      },
      "recruit": {
        "heading": "Recruit",
        "body": "現在、募集しておりません。",
        "positions": [],
        "contactEmail": "recruit@trunklii.com"
      },
      "ctaHeading": "まもなくオープン。\nお楽しみに。",
      "ctaNote": "最新情報はInstagramで"
    }
  }
};
