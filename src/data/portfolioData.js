export const HTML = 'HTML'
export const CSS = 'CSS'
export const JAVASCRIPT = 'JavaScript'
export const TYPESCRIPT = 'TypeScript'
export const REACT = 'React'
export const VUE = 'Vue'
export const ANGULAR = 'Angular'
export const LARAVEL = 'Laravel'
export const PHP = 'PHP'
export const NODE_JS = 'Node.js'
export const NEXT_JS = 'Next.js'
export const MYSQL = 'MySQL'
export const POSTGRESQL = 'PostgreSQL'
export const FLUTTER = 'Flutter'
export const DART = 'Dart'
export const PYTHON = 'Python'
export const JAVA = 'Java'
export const THREE_JS = 'Three.js'
export const GSAP = 'GSAP'
export const TAILWIND_CSS = 'Tailwind CSS'

const googleTechnologyIcon = url => `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(url)}`

export const HTML_IMAGE = googleTechnologyIcon('https://developer.mozilla.org/en-US/docs/Web/HTML')
export const CSS_IMAGE = googleTechnologyIcon('https://developer.mozilla.org/en-US/docs/Web/CSS')
export const JAVASCRIPT_IMAGE = googleTechnologyIcon('https://developer.mozilla.org/en-US/docs/Web/JavaScript')
export const TYPESCRIPT_IMAGE = googleTechnologyIcon('https://www.typescriptlang.org')
export const REACT_IMAGE = googleTechnologyIcon('https://react.dev')
export const VUE_IMAGE = googleTechnologyIcon('https://vuejs.org')
export const ANGULAR_IMAGE = googleTechnologyIcon('https://angular.dev')
export const LARAVEL_IMAGE = googleTechnologyIcon('https://laravel.com')
export const PHP_IMAGE = googleTechnologyIcon('https://www.php.net')
export const NODE_JS_IMAGE = googleTechnologyIcon('https://nodejs.org')
export const NEXT_JS_IMAGE = googleTechnologyIcon('https://nextjs.org')
export const MYSQL_IMAGE = googleTechnologyIcon('https://www.mysql.com')
export const POSTGRESQL_IMAGE = googleTechnologyIcon('https://www.postgresql.org')
export const FLUTTER_IMAGE = googleTechnologyIcon('https://flutter.dev')
export const DART_IMAGE = googleTechnologyIcon('https://dart.dev')
export const PYTHON_IMAGE = googleTechnologyIcon('https://www.python.org')
export const JAVA_IMAGE = googleTechnologyIcon('https://www.java.com')
export const THREE_JS_IMAGE = googleTechnologyIcon('https://threejs.org')
export const GSAP_IMAGE = googleTechnologyIcon('https://gsap.com')
export const TAILWIND_CSS_IMAGE = googleTechnologyIcon('https://tailwindcss.com')
export const KISHA_IMAGE = googleTechnologyIcon('https://kisha.co.id/')
export const GITHUB_PROJECT_IMAGE = googleTechnologyIcon('https://github.com/Rachman-Akbar/ProjectAn')

export const WORK_CARD_URL = 'https://github.com/Rachman-Akbar/ProjectAn'
export const KISHA_URL = 'https://kisha.co.id/'

export const PROJECT_REDIRECT_URL = 'https://docs.google.com/spreadsheets/d/14LB97M4e7dHV7nhr0pxxXNIZW8KekoJQVAusyEDev_U/edit?gid=0#gid=0'

export const portfolioData = {
  site: {
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=84',
    idCardImage: 'images/idcard/idcard.png',
  },
  contact: {
    email: 'akbarfahlevy39@gmail.com',
    endpoint: 'https://formsubmit.co/ajax/akbarfahlevy39@gmail.com',
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mochammad-rachman-akbar-fahlevy-a2091739b?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: 'fa-brands fa-linkedin-in' },
    { label: 'Instagram', url: 'https://www.instagram.com/rachman.akbarr?igsh=NmFhenU5aDAwODY1', icon: 'fa-brands fa-instagram' },
    { label: 'TikTok', url: 'https://tiktok.com/@akbarajal4h', icon: 'fa-brands fa-tiktok' },
    { label: 'GitHub', url: 'https://github.com/Rachman-Akbar', icon: 'fa-brands fa-github' },
    { label: 'LYNK', url: 'https://lynk.id/rachmanakbar', icon: 'fa-solid fa-link' },
  ],
  stages: [
    {
      id: 'sd',
      label: 'SD',
      color: '#ff7f93',
      soft: '#ffe8ef',
      glow: '#ffd0db',
      title: 'SDN Jati Sidoarjo',
      desc: 'Membangun rasa ingin tahu, kebiasaan belajar, dan fondasi untuk memahami masalah secara runtut.',
      url: 'https://www.instagram.com/sdnjati_sidoarjo?igsh=czJreXI1a2wzZjM=',
      external: true,
      localImage: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRNSSn6Q7nVdhO8341r8sy5_hYexS3JilF-4n9gldeZbTgmCTHIwgVxrrO&s=10',
    },
    {
      id: 'smp',
      label: 'SMP',
      color: '#7d6cf2',
      soft: '#edeaff',
      glow: '#d8d2ff',
      title: 'SMPN 4 Sidoarjo',
      desc: 'Mulai aktif berorganisasi, bekerja dalam tim, dan menjaga keseimbangan antara akademik dan kegiatan sekolah.',
      url: 'https://www.instagram.com/smpn4_sidoarjo?igsh=dXBnMGtuMG0zc3E1',
      external: true,
      localImage: '',
      image: 'https://smpn4sidoarjo.sch.id/wp-content/uploads/2022/08/smp-600x450.jpeg',
    },
    {
      id: 'smk',
      label: 'SMK',
      color: '#4f8dff',
      soft: '#e4efff',
      glow: '#c9ddff',
      title: 'SMKN 2 Buduran',
      desc: 'Fokus pada keterampilan teknis, logika pemrograman, dan kebiasaan menyelesaikan proyek secara praktis.',
      url: 'https://www.instagram.com/smkn2buduran.official?igsh=MXR6MG9qYWlucHQydw==',
      external: true,
      localImage: '',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqRPSckCnypggA9OgQxpN3WHTpwxwhsxSqPHlkp4GuyoQFQ40BrNtXP4U&s=10',
    },
    {
      id: 'pt',
      label: 'PT',
      color: '#36bda1',
      soft: '#e4faf5',
      glow: '#c9f3e9',
      title: 'Pendidikan Tinggi',
      desc: 'Mendalami rekayasa perangkat lunak, sistem informasi, analisis kebutuhan, dan pengembangan produk digital.',
      url: '',
      external: false,
      localImage: '',
      image: 'https://www.shutterstock.com/image-vector/pointing-forward-emoticon-260nw-1296979276.jpg',
    },
    {
      id: 'work',
      label: 'Work',
      color: '#f1a64e',
      soft: '#fff3df',
      glow: '#ffe2b6',
      title: 'Pengalaman Kerja',
      desc: 'Menerapkan proses pengembangan software pada kebutuhan nyata, berkolaborasi dengan tim, dan terus memperbaiki kualitas produk.',
      url: '/work',
      external: false,
      localImage: '',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=84',
    },
  ],
  projects: [
    {
      slug: 'raja-ampat',
      key: 'rajaAmpat',
      title: 'PKN Kabupaten Raja Ampat',
      tag: 'Website · Edukasi',
      type: 'website',
      redirect: 'url',
      url: PROJECT_REDIRECT_URL,
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/project/rajaAmpat.png',
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=82',
      desc: 'Website edukasi mengenai wilayah, budaya, dan nilai kebangsaan Kabupaten Raja Ampat.',
      body: [
        'Project ini dirancang sebagai media informasi dan edukasi yang menyajikan konten Kabupaten Raja Ampat dalam tampilan yang mudah dibaca dan responsif.',
        'Struktur project dibuat agar konten dapat dipisahkan per topik, sehingga informasi budaya, tradisi, wilayah, dan materi edukasi dapat berkembang tanpa mengubah struktur utama halaman.',
      ],
      technologies: [HTML, CSS, JAVASCRIPT, 'Responsive Web'],
    },
    {
      slug: 'monitoring-kelas',
      key: 'monitoringKelas',
      title: 'Monitoring Kelas',
      tag: 'Dashboard · Monitoring',
      type: 'application',
      redirect: 'url',
      url: PROJECT_REDIRECT_URL,
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/monitoringKelas.png',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=82',
      desc: 'Sistem monitoring kegiatan kelas untuk mempermudah pemantauan aktivitas, status, dan informasi penting.',
      body: [
        'Monitoring Kelas dibuat untuk menyederhanakan proses pemantauan aktivitas kelas melalui satu tampilan yang terstruktur.',
        'Halaman detail ini dapat kamu isi dengan alur penggunaan, peran pengguna, fitur utama, tantangan pengembangan, dan hasil implementasi.',
      ],
      technologies: [REACT, 'Dashboard', 'API'],
    },
    {
      slug: 'website-marketplace',
      key: 'websiteMarketplace',
      title: 'Website Marketplace',
      tag: 'Website · Marketplace',
      type: 'website',
      redirect: 'url',
      url: PROJECT_REDIRECT_URL,
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/websiteMarketplace.png',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1100&q=82',
      desc: 'Website marketplace dengan alur katalog, detail produk, keranjang, dan transaksi yang terintegrasi.',
      body: [
        'Website Marketplace berfokus pada alur belanja yang jelas, katalog yang mudah dipindai, dan pengalaman pengguna yang tetap ringan pada berbagai ukuran layar.',
        'Jika project ini sudah memiliki URL publik, ubah field redirect menjadi external dan isi url pada portfolioData.js agar card langsung membuka website tersebut.',
      ],
      technologies: [REACT, LARAVEL, 'REST API'],
    },
    {
      slug: 'marketplace-umkm',
      key: 'MarketplaceUMKM',
      title: 'Marketplace UMKM',
      tag: 'Product · UMKM',
      type: 'application',
      redirect: 'url',
      url: PROJECT_REDIRECT_URL,
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/MarketplaceUMKM.png',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=82',
      desc: 'Produk digital untuk membantu UMKM mengelola katalog, penjualan, dan aktivitas toko dengan lebih sederhana.',
      body: [
        'Marketplace UMKM dirancang untuk kebutuhan operasional bisnis skala kecil dengan alur yang tidak rumit.',
        'Detail artikel dapat dilengkapi dengan proses pembentukan fitur, pengelolaan produk, transaksi, stok, serta pengalaman seller dan buyer.',
      ],
      technologies: [REACT, LARAVEL, MYSQL],
    },
    {
      slug: 'mini-games-sdgs',
      key: 'miniGamesSDGS',
      title: 'Mini Games SDGs',
      tag: 'Interactive · Education',
      type: 'application',
      redirect: 'url',
      url: PROJECT_REDIRECT_URL,
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/miniGamesSDGS.png',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=900&q=82',
      desc: 'Mini game interaktif bertema Sustainable Development Goals untuk menyampaikan materi edukasi dengan cara yang lebih menarik.',
      body: [
        'Mini Games SDGs menggunakan interaksi sederhana untuk mengubah materi edukasi menjadi pengalaman yang lebih aktif.',
        'Halaman detail dapat digunakan untuk menjelaskan tujuan pembelajaran, mekanisme permainan, desain level, dan hasil pengujian kepada pengguna.',
      ],
      technologies: [JAVASCRIPT, 'Game Logic', 'Education'],
    },
  ],
  experiences: [
    {
      id: 1,
      role: 'Software Engineer',
      company: 'PT. Kisha Indonesia Buffer',
      title: 'Membangun dan mengembangkan sistem aplikasi',
      summary: 'Tuliskan ringkasan pengalaman kerja, tanggung jawab utama, pencapaian, dan dampak pekerjaan di sini. Lorem wkwkwkw kw wkwkwkwkkwkww ',
      color: '#7d6cf2',
      soft: '#edeaff',
      coverImage: GITHUB_PROJECT_IMAGE,
      coverAlt: 'Software Engineer',
      supportMode: 'auto',
      sponsors: [
        { image: KISHA_IMAGE, url: KISHA_URL, name: 'KISHA', type: 'inspired' },
        { image: KISHA_IMAGE, url: KISHA_URL, name: 'KISHA', type: 'inspired' },
        { image: KISHA_IMAGE, url: KISHA_URL, name: 'KISHA', type: 'support' },
      ],
      url: WORK_CARD_URL,
    },
    {
      id: 2,
      role: 'Full Stack Developer',
      company: 'Nama Project / Freelance',
      title: 'Pengembangan produk digital dari awal hingga rilis',
      summary: 'Gunakan card ini untuk menjelaskan tanggung jawab, hasil kerja, dan dampak project secara singkat tanpa membuat layout terlalu padat.',
      color: '#4f8dff',
      soft: '#e4efff',
      coverImage: GITHUB_PROJECT_IMAGE,
      coverAlt: 'Full Stack Developer',
      supportMode: 'auto',
      sponsors: [
        { image: KISHA_IMAGE, url: KISHA_URL, name: 'KISHA', type: 'inspired' },
        { image: KISHA_IMAGE, url: KISHA_URL, name: 'KISHA', type: 'support' },
      ],
      url: WORK_CARD_URL,
    },
  ],
}
