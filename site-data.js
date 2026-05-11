// Trunklii — Site Data
// CMSで編集してエクスポートし、このファイルを上書きするだけでサイトに反映されます
window.SITE_DATA = {
  global: {
    brandName: "Trunklii",
    copyright: "© 2026 Trunklii. All rights reserved."
  },
  studios: {
    et: {
      key: "et",
      name: "Studio et.",
      shortName: "et.",
      tagline: "I wish you have a healthy life filled with happiness",
      description: "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、七五三・ニューボーン・バースデーなど\n大切な記念日を美しい写真に残します。",
      accentColor: "#b8935a",
      address: "〒501-6253 岐阜県羽島市小熊町島新道76-9 2階",
      tel: "050-1751-2601",
      hours: "10:00 – 18:00（火曜定休）",
      instagram: "https://www.instagram.com/studio_et._",
      instagramHandle: "@studio_et._",
      mapUrl: "https://goo.gl/maps/ZVSCkidKRbLqAvU19",
      bookingUrl: "https://et.trunklii.com/reservation",
      bookingLabel: "予約する",
      comingSoon: false,
      heroImages: [
        { file: "AA-18116290120491565.jpg", alt: "Studio et. hero" },
        { file: "AA-18103506649752477.jpg", alt: "Studio et. hero 2" },
        { file: "AA-17856884340522635.jpg", alt: "Studio et. hero 3" }
      ],
      about: {
        image: "18295179019220181.jpg",
        heading: "About Studio et.",
        body: "子どもたちの輝く瞬間を、花とともに。\nスタジオエトでは、七五三・ニューボーン・バースデーなど\n大切な記念日を美しい写真に残します。\n\n一つひとつのお花から、衣装、ヘアメイク、撮影まで\nすべてをスタジオにてご提供しています。"
      },
      gallery: [
        { file: "18505164388065081.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18417574654096276.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18387950968193350.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18384987919132419.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18375330547181332.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18364722763198059.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18335184631230617.jpg", caption: "Newborn", category: "newborn" },
        { file: "18334778899231083.jpg", caption: "Birthday", category: "birthday" },
        { file: "18303974821264064.jpg", caption: "Family", category: "family" },
        { file: "18295179019220181.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18294900103268494.jpg", caption: "Newborn", category: "newborn" },
        { file: "18282725923278968.jpg", caption: "Birthday", category: "birthday" },
        { file: "18273705787256865.jpg", caption: "Maternity", category: "maternity" },
        { file: "625012292_18073272839576495_2638135942964414464_n.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "625133384_18073375556576495_4642466183622618758_n.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "17842722768624869.jpg", caption: "Birthday", category: "birthday" }
      ],
      kimono: {
        heading: "Kimono",
        body: "厳選された着物をスタジオにてご用意。\n花飾りのヘアアレンジも含めたトータルコーディネートをご提供します。",
        items: [
          { file: "18364722763198059.jpg", name: "着物 A", desc: "赤地・花柄" },
          { file: "18375330547181332.jpg", name: "着物 B", desc: "緑地・鶴柄" },
          { file: "18384987919132419.jpg", name: "着物 C", desc: "水色地・牡丹柄" }
        ]
      },
      costume: {
        heading: "Costume",
        body: "スタジオ独自にセレクトした衣装をご用意しています。\n洋装・和装どちらもご対応可能です。",
        items: [
          { file: "18505164388065081.jpg", name: "Dress A", desc: "ホワイトチュールドレス" },
          { file: "18417574654096276.jpg", name: "Dress B", desc: "ピンクフローラルドレス" },
          { file: "18387950968193350.jpg", name: "Dress C", desc: "ブルーシルクドレス" }
        ]
      },
      plans: [
        {
          key: "newborn",
          name: "Newborn Plan",
          desc: "生後3週間以内の新生児撮影。花とともに繊細な命を記録します。",
          tag: "人気No.1",
          detail: {
            heroImage: "18335184631230617.jpg",
            tagline: "新しい命を、花とともに。",
            longDescription: "生後3週間以内の新生児を、自然光の柔らかな光に包まれた空間で撮影します。\n眠っている表情、小さな手足、お母さまの腕の中での安らかな時間 — \n二度と戻らない、最も繊細な日々を写真に残します。",
            notes: "新生児の体調を最優先に、無理のないペースで撮影します。\n授乳・おむつ替えのスペースをご用意しています。"
          },
          variants: [
            {
              cuts: 50,
              label: "50カットプラン",
              price: "¥55,000",
              duration: "90分",
              description: "ゆっくりと時間をかけて、表情やシーンの幅広いバリエーションを残せるプランです。",
              includes: [
                "撮影(90分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ50カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "アルバム", price: "¥22,000〜" },
                { name: "フォトフレーム", price: "¥8,800〜" }
              ],
              gallery: ["18335184631230617.jpg", "18294900103268494.jpg"]
            },
            {
              cuts: 20,
              label: "20カットプラン",
              price: "¥33,000",
              duration: "60分",
              description: "厳選した20カットをお届けする、はじめての方にもお試しいただきやすいプランです。",
              includes: [
                "撮影(60分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ20カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "データ追加(1カット)", price: "¥1,100" },
                { name: "アルバム", price: "¥22,000〜" }
              ],
              gallery: ["18335184631230617.jpg"]
            }
          ]
        },
        {
          key: "birthday",
          name: "Birthday Plan",
          desc: "1歳のバースデーフォト。スマッシュケーキも対応。",
          tag: "",
          detail: {
            heroImage: "18334778899231083.jpg",
            tagline: "一年の歩みを、笑顔とともに。",
            longDescription: "お誕生日を、特別なセットで撮影します。\nスマッシュケーキでの撮影も承ります。\nお子さまのペースを大切に、自然な笑顔をお引き出しします。",
            notes: "ご希望のテーマ・カラーがあればご相談ください。"
          },
          variants: [
            {
              cuts: 50,
              label: "50カットプラン",
              price: "¥55,000",
              duration: "90分",
              description: "お子さまのリラックスした表情から動きのあるシーンまで、たっぷり残せるプランです。",
              includes: [
                "撮影(90分)",
                "ヘアメイク・スタイリング",
                "生花・バースデー装飾",
                "編集済みデータ50カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "スマッシュケーキ", price: "¥5,500〜" },
                { name: "アルバム", price: "¥22,000〜" }
              ],
              gallery: ["18334778899231083.jpg", "18282725923278968.jpg", "17842722768624869.jpg"]
            },
            {
              cuts: 20,
              label: "20カットプラン",
              price: "¥38,500",
              duration: "60分",
              description: "コンパクトな撮影時間で、ベストな20カットをお届けします。",
              includes: [
                "撮影(60分)",
                "ヘアメイク・スタイリング",
                "生花・バースデー装飾",
                "編集済みデータ20カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "スマッシュケーキ", price: "¥5,500〜" },
                { name: "データ追加(1カット)", price: "¥1,100" }
              ],
              gallery: ["18334778899231083.jpg"]
            }
          ]
        },
        {
          key: "753",
          name: "753 Plan",
          desc: "七五三の晴れ姿を、季節の花飾りとともに。",
          tag: "",
          detail: {
            heroImage: "18505164388065081.jpg",
            tagline: "七五三の晴れ姿を、花とともに。",
            longDescription: "和裁士仕立ての完全一点物の着物と、生花のヘアアレンジメントで\n七五三の特別な一日を記録します。\n伝統と新しさを織り交ぜた、Studio et. ならではのスタイルでお届けします。",
            notes: "七五三シーズン(9〜11月)は予約が集中しますので、お早めにご相談ください。"
          },
          variants: [
            {
              cuts: 50,
              label: "50カットプラン",
              price: "¥77,000",
              duration: "120分",
              description: "着物の各カット、ヘアスタイル、立ち姿・引き・寄りまで、ボリュームのあるカット数で残せます。",
              includes: [
                "撮影(120分)",
                "着物レンタル(和裁士仕立ての一点物)",
                "生花を使ったヘアアレンジメント",
                "ヘアメイク・着付け",
                "編集済みデータ50カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "出張撮影(神社)", price: "¥22,000〜" },
                { name: "アルバム", price: "¥22,000〜" },
                { name: "兄弟同時撮影", price: "¥11,000〜" }
              ],
              gallery: ["18505164388065081.jpg", "18417574654096276.jpg", "18387950968193350.jpg", "18375330547181332.jpg"]
            },
            {
              cuts: 20,
              label: "20カットプラン",
              price: "¥55,000",
              duration: "75分",
              description: "厳選した20カットを丁寧にお届けする、スタンダードな七五三プランです。",
              includes: [
                "撮影(75分)",
                "着物レンタル(和裁士仕立ての一点物)",
                "生花を使ったヘアアレンジメント",
                "ヘアメイク・着付け",
                "編集済みデータ20カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "出張撮影(神社)", price: "¥22,000〜" },
                { name: "アルバム", price: "¥22,000〜" },
                { name: "データ追加(1カット)", price: "¥1,100" }
              ],
              gallery: ["18505164388065081.jpg", "18417574654096276.jpg"]
            }
          ]
        },
        {
          key: "family",
          name: "Family Plan",
          desc: "家族みんなで残す、大切な一瞬のポートレート。",
          tag: "",
          detail: {
            heroImage: "18303974821264064.jpg",
            tagline: "家族の今を、永遠に。",
            longDescription: "ご家族みなさまでのポートレート撮影。\n何気ない日常の延長のような自然な表情から、\n節目の記念写真まで、ご希望に合わせて撮影します。",
            notes: "ご家族の人数に制限はありません。お気軽にご相談ください。"
          },
          variants: [
            {
              cuts: 50,
              label: "50カットプラン",
              price: "¥66,000",
              duration: "90分",
              description: "全員集合のフォーマルから、個別ショット、自然な日常感まで、しっかり残せるプランです。",
              includes: [
                "撮影(90分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ50カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "アルバム", price: "¥22,000〜" },
                { name: "ペットとの撮影", price: "¥5,500〜" }
              ],
              gallery: ["18303974821264064.jpg"]
            },
            {
              cuts: 20,
              label: "20カットプラン",
              price: "¥44,000",
              duration: "60分",
              description: "ご家族全員のベストショットを20カットでお届け。記念撮影として人気のプランです。",
              includes: [
                "撮影(60分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ20カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "ペットとの撮影", price: "¥5,500〜" },
                { name: "データ追加(1カット)", price: "¥1,100" }
              ],
              gallery: ["18303974821264064.jpg"]
            }
          ]
        },
        {
          key: "maternity",
          name: "Maternity Plan",
          desc: "新しい命を迎える前の、特別な時間を永遠に。",
          tag: "",
          detail: {
            heroImage: "18273705787256865.jpg",
            tagline: "新しい命を迎える前の、特別な時間。",
            longDescription: "妊娠後期の、ふくらんだお腹を花とともに撮影します。\nお一人さまでも、パートナーやお子さまとご一緒でも。\n命を迎える前のひととき、優しい光の中で残します。",
            notes: "妊娠28〜36週ごろが撮影のおすすめ時期です。\n体調に合わせて柔軟に対応します。"
          },
          variants: [
            {
              cuts: 50,
              label: "50カットプラン",
              price: "¥55,000",
              duration: "90分",
              description: "立ち姿、寄り、シルエット、パートナーやお子さまとのカットまで、幅広く残せるプランです。",
              includes: [
                "撮影(90分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ50カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "パートナーとの撮影", price: "無料" },
                { name: "上のお子さまとの撮影", price: "¥5,500〜" },
                { name: "アルバム", price: "¥22,000〜" }
              ],
              gallery: ["18273705787256865.jpg"]
            },
            {
              cuts: 20,
              label: "20カットプラン",
              price: "¥33,000",
              duration: "60分",
              description: "厳選した20カットで、マタニティ期の美しさを記録します。",
              includes: [
                "撮影(60分)",
                "ヘアメイク・スタイリング",
                "生花を使った空間装飾",
                "編集済みデータ20カット",
                "当日のデータ納品"
              ],
              options: [
                { name: "パートナーとの撮影", price: "無料" },
                { name: "データ追加(1カット)", price: "¥1,100" }
              ],
              gallery: ["18273705787256865.jpg"]
            }
          ]
        }
      ],
      goods: {
        heading: "Goods",
        body: "撮影と一緒にお選びいただけるオリジナルグッズをご用意しています。",
        items: [
          { file: "18335184631230617.jpg", name: "アルバム", price: "¥22,000〜", desc: "厳選した写真を一冊に。" },
          { file: "18303974821264064.jpg", name: "フォトフレーム", price: "¥8,800〜", desc: "お気に入りの一枚を飾って。" },
          { file: "17842722768624869.jpg", name: "データUSB", price: "¥5,500〜", desc: "全データを記念にお持ち帰り。" }
        ]
      },
      calendar: {
        heading: "Calendar",
        body: "撮影可能日のご案内です。\n最新の空き状況は予約ページよりご確認ください。",
        embedUrl: "",
        note: "※定休日：火曜日 / 撮影は完全予約制となっております。"
      },
      reservation: {
        heading: "Reservation",
        body: "ご予約は下記フォームよりお願いいたします。\nご希望日時・撮影プランをお選びください。",
        formUrl: "",
        note: "ご予約後5営業日以内に、確認のお電話を差し上げます。"
      },
      cancelPolicy: {
        heading: "Cancellation Policy",
        body: "撮影のご予約をいただいた後、キャンセルされる場合は下記の通り料金が発生いたします。\nご予約前に必ずご確認ください。",
        items: [
          { when: "撮影日の8日前まで", fee: "無料" },
          { when: "撮影日の7日〜4日前", fee: "プラン料金の30%" },
          { when: "撮影日の3日〜前日", fee: "プラン料金の50%" },
          { when: "撮影日当日", fee: "プラン料金の100%" }
        ],
        note: "お子さまの体調不良など、やむを得ない事情の場合はご相談ください。"
      },
      qa: {
        heading: "Q & A",
        body: "よくいただくご質問をまとめました。\nその他のご質問はお気軽にお問い合わせください。",
        items: [
          { q: "撮影時間はどれくらいですか？", a: "プランによりますが、約60〜90分が目安です。お子さまの様子を見ながら柔軟に進めます。" },
          { q: "兄弟での撮影は可能ですか？", a: "可能です。ご予約時に人数をお知らせください。追加料金が発生する場合があります。" },
          { q: "衣装は持ち込めますか？", a: "はい、お気に入りの衣装をお持ち込みいただけます。スタジオの衣装と組み合わせることも可能です。" },
          { q: "撮影データはいつ受け取れますか？", a: "撮影当日にお渡しします。アルバムやフォトフレームは後日のお届けとなります。" },
          { q: "雨天時はどうなりますか？", a: "屋内スタジオでの撮影のため、天候に関わらず予定通り行えます。" },
          { q: "駐車場はありますか？", a: "スタジオ前に2台分のお客様専用駐車場をご用意しております。" }
        ]
      },
      flow: {
        heading: "Flow",
        body: "ご予約から撮影、納品までの流れをご案内します。",
        steps: [
          { title: "Web予約", desc: "公式サイトより撮影プランをお選びいただき、ご希望日時をご予約ください。", note: "" },
          { title: "予約完了メール受信", desc: "ご登録のメールアドレスに予約確認メールをお送りします。", note: "" },
          { title: "事前の電話カウンセリング", desc: "撮影内容・衣装・ご希望のイメージなどを丁寧にヒアリングします。", note: "予約後5営業日以内" },
          { title: "当日撮影", desc: "リラックスした雰囲気の中で、お子さまの自然な表情を撮影します。", note: "" },
          { title: "当日データ納品", desc: "撮影当日に編集済みデータをお渡しします。", note: "アルバムやフォトフレームなどは後日納品" }
        ]
      },
      recruit: {
        heading: "Recruit",
        body: "スタジオエトでは、フォトグラファー・ヘアメイクアーティストを募集しています。\n子どもたちの大切な瞬間をともに記録しませんか。",
        positions: [
          { title: "フォトグラファー", type: "正社員 / 業務委託", desc: "子ども・家族のポートレート撮影経験者歓迎。" },
          { title: "ヘアメイクアーティスト", type: "業務委託", desc: "着物・洋装ヘアメイク経験者歓迎。" }
        ],
        contactEmail: "recruit@trunklii.com"
      },
      ctaHeading: "大切な記念日を、\n一緒に残しましょう。",
      ctaNote: "ご予約・お問い合わせはお気軽に"
    },
    nr: {
      key: "nr",
      name: "Maison nr.",
      shortName: "nr.",
      tagline: "A new chapter begins",
      description: "まもなくオープン。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供する\nフォトスタジオです。",
      accentColor: "#7a9e95",
      address: "〒486-0806 愛知県春日井市大手田酉町1丁目5-9",
      tel: "050-1751-2601",
      hours: "詳細は近日公開",
      instagram: "https://www.instagram.com/maison_nr._",
      instagramHandle: "@maison_nr._",
      mapUrl: "https://maps.app.goo.gl/itQNLUzV7xRpjfze6",
      bookingUrl: "https://nr.trunklii.com/reservation",
      bookingLabel: "予約する",
      comingSoon: true,
      heroImages: [
        { file: "18273705787256865.jpg", alt: "Maison nr. hero" },
        { file: "18295179019220181.jpg", alt: "Maison nr. hero 2" },
        { file: "AA-18103506649752477.jpg", alt: "Maison nr. hero 3" }
      ],
      about: {
        image: "18303974821264064.jpg",
        heading: "About Maison nr.",
        body: "まもなくオープン。\nMaison nr. は、独自の世界観で\n新たな表現とスタイルをご提供するフォトスタジオです。\n\n詳細は近日公開予定です。"
      },
      gallery: [
        { file: "18505164388065081.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18417574654096276.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18387950968193350.jpg", caption: "Shichi-Go-San", category: "753" },
        { file: "18335184631230617.jpg", caption: "Newborn", category: "newborn" },
        { file: "18303974821264064.jpg", caption: "Family", category: "family" },
        { file: "18294900103268494.jpg", caption: "Newborn", category: "newborn" }
      ],
      kimono: { heading: "Kimono", body: "近日公開予定。", items: [] },
      costume: { heading: "Costume", body: "近日公開予定。", items: [] },
      plans: [
        { key: "newborn", name: "Newborn Plan", desc: "生後3週間以内の新生児撮影。", tag: "", detail: null, variants: [] },
        { key: "birthday", name: "Birthday Plan", desc: "1歳のバースデーフォト。", tag: "", detail: null, variants: [] },
        { key: "753", name: "753 Plan", desc: "七五三の晴れ姿を。", tag: "", detail: null, variants: [] },
        { key: "family", name: "Family Plan", desc: "家族みんなで残す一瞬のポートレート。", tag: "", detail: null, variants: [] },
        { key: "maternity", name: "Maternity Plan", desc: "特別な時間を永遠に。", tag: "", detail: null, variants: [] }
      ],
      goods: { heading: "Goods", body: "近日公開予定。", items: [] },
      calendar: { heading: "Calendar", body: "撮影可能日は近日公開予定です。", embedUrl: "", note: "" },
      reservation: { heading: "Reservation", body: "予約受付は近日開始予定です。", formUrl: "", note: "" },
      cancelPolicy: {
        heading: "Cancellation Policy",
        body: "キャンセルポリシーの詳細は近日公開予定です。",
        items: [],
        note: ""
      },
      qa: {
        heading: "Q & A",
        body: "よくいただくご質問は近日公開予定です。",
        items: []
      },
      flow: {
        heading: "Flow",
        body: "ご予約から撮影、納品までの流れをご案内します。",
        steps: [
          { title: "Web予約", desc: "公式サイトより撮影プランをお選びいただき、ご希望日時をご予約ください。", note: "" },
          { title: "予約完了メール受信", desc: "ご登録のメールアドレスに予約確認メールをお送りします。", note: "" },
          { title: "事前の電話カウンセリング", desc: "撮影内容・衣装・ご希望のイメージなどを丁寧にヒアリングします。", note: "予約後5営業日以内" },
          { title: "当日撮影", desc: "リラックスした雰囲気の中で、お子さまの自然な表情を撮影します。", note: "" },
          { title: "当日データ納品", desc: "撮影当日に編集済みデータをお渡しします。", note: "アルバムやフォトフレームなどは後日納品" }
        ]
      },
      recruit: {
        heading: "Recruit",
        body: "Maison nr. スタッフ募集情報は近日公開予定です。",
        positions: [],
        contactEmail: "recruit@trunklii.com"
      },
      ctaHeading: "まもなくオープン。\nお楽しみに。",
      ctaNote: "最新情報はInstagramで"
    }
  }
};
