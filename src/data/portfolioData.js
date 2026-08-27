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
      slug: 'games-sdgs',
      key: 'gamesSDGS',
      title: 'Games Bertema SDGs',
      tag: 'Mobile · Android · Education',
      type: 'application',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/1M6Sp0TiF1x7Eg7GzD4AqjCyrNt9spjoPZSXcL-Tct90/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/project/SDGSgame.png',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=900&q=82',
      desc: 'Games bertema Sustainable Development Goals (SDGs) untuk platform Android.',
      body: [
        'Games edukasi bertema SDGs yang dikembangkan untuk platform Android sebagai media pembelajaran yang interaktif.',
        'Project ini menyajikan materi SDGs melalui permainan agar lebih mudah dipahami oleh pengguna.',
      ],
      technologies: [FLUTTER, DART, 'Android'],
    },
    {
      slug: 'match-card',
      key: 'matchCard',
      title: 'Match Card',
      tag: 'Website · Game',
      type: 'application',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/14Ey5d1kJGcnuZC93THjFj8ScMTLwBnrJWadbJp_ypgI/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/project/matchCard.png',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=82',
      desc: 'Game match card yang dikembangkan dengan Laravel dan React.',
      body: [
        'Match Card merupakan game mencocokkan kartu yang dibangun dengan Laravel sebagai backend dan React sebagai frontend.',
        'Dikembangkan saat PKL di Kisha sebagai pengembang game.',
      ],
      technologies: [LARAVEL, REACT, MYSQL],
    },
    {
      slug: 'monitoring-kelas',
      key: 'monitoringKelas',
      title: 'Aplikasi Monitoring Kelas',
      tag: 'Mobile · Dashboard',
      type: 'application',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/1gzm5EuOwEXUK2qtxAf4fw8-WAJxBi-BAGRmsHosQO3k/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=82',
      desc: 'Aplikasi monitoring kelas untuk Android yang terhubung dengan Laravel dan React JS.',
      body: [
        'Aplikasi monitoring kelas dibangun untuk platform Android dengan backend Laravel dan frontend React JS.',
        'Memudahkan pemantauan aktivitas kelas secara real-time.',
      ],
      technologies: [REACT, LARAVEL, 'Android'],
    },
    {
      slug: 'raja-ampat',
      key: 'rajaAmpat',
      title: 'PKN Kabupaten Raja Ampat',
      tag: 'Website · Edukasi',
      type: 'website',
      redirect: 'url',
      url: 'https://pknkabupatenrajampat.netlify.app/',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/project/rajaAmpat.png',
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=82',
      desc: 'Website edukasi mengenai wilayah, budaya, dan nilai kebangsaan Kabupaten Raja Ampat.',
      body: [
        'Website edukasi yang menyajikan informasi wilayah, budaya, dan nilai kebangsaan Kabupaten Raja Ampat.',
        'Dibangun menggunakan HTML, CSS, dan JavaScript dengan tampilan responsif.',
      ],
      technologies: [HTML, CSS, JAVASCRIPT, 'Responsive Web'],
    },
    {
      slug: 'marketplace-internal',
      key: 'marketplaceInternal',
      title: 'Layanan Marketplace Internal Perusahaan',
      tag: 'Website · Marketplace',
      type: 'website',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/1YRn8wSyfsaqQgwdfTb_C3kjYfhlgS8DbVeNDSi2cT98/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '/images/project/marketplaceInternal.png',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1100&q=82',
      desc: 'Layanan marketplace internal perusahaan yang dikembangkan dengan Laravel dan React.',
      body: [
        'Marketplace internal perusahaan untuk pengelolaan layanan jasa operasional.',
        'Dibangun menggunakan Laravel sebagai backend dan React sebagai frontend.',
      ],
      technologies: [LARAVEL, REACT, MYSQL],
    },
    {
      slug: 'penyedia-marketplace',
      key: 'penyediaMarketplace',
      title: 'Penyedia Marketplace',
      tag: 'Website · Marketplace',
      type: 'website',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/1TJGennJ-3vkHT8GAcKXBbOubuvMp4Gg5fWi13hQRuI0/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=82',
      desc: 'Penyedia marketplace yang dikembangkan dengan Laravel dan React JS.',
      body: [
        'Platform penyedia marketplace yang mempertemukan penjual, pembeli, dan penyedia layanan.',
        'Dibangun menggunakan Laravel dan React JS.',
      ],
      technologies: [LARAVEL, REACT, 'REST API'],
    },
    {
      slug: 'games-reward',
      key: 'gamesReward',
      title: 'Games untuk Mendapatkan Reward',
      tag: 'Mobile · Android · Game',
      type: 'application',
      redirect: 'url',
      url: 'https://docs.google.com/document/d/1xh6mZ8Krs3VVNvb82DReH_3auF4VK-WeDqxAlYFdlDg/edit?usp=drive_link',
      ratio: '1 / 1',
      cardWidth: 180,
      gridWidth: 180,
      gridSpan: 1,
      rowSpan: 1,
      localImage: '',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=82',
      desc: 'Games untuk mendapatkan reward dan dapat digunakan pada aplikasi marketplace.',
      body: [
        'Games berbasis Android dirancang untuk memberikan reward kepada pengguna marketplace.',
        'Dapat diintegrasikan dengan aplikasi marketplace untuk meningkatkan keterlibatan pengguna.',
      ],
      technologies: [FLUTTER, DART, 'Android'],
    },
  ],
  experiences: [
    {
      id: 1,
      role: 'Student Company Member',
      company: 'Student Company',
      title: 'Bergabung ke dalam organisasi Student Company dan membangun perusahaan siswa',
      summary: 'Selama enam bulan menjabat sebagai Direktur Public Relations di Student Company SMKN 2 Buduran, saya berhasil mengasah keterampilan kepemimpinan dan komunikasi bisnis nyata melalui pengelolaan perusahaan Flowish dengan produk unggulannya, Lotus Bag. Tanggung jawab utama saya mencakup penyusunan strategi konten untuk menjaga citra positif perusahaan, memaparkan program Corporate Social Responsibility (CSR) pada saat launching, hingga menyajikan laporan pertanggungjawaban kegiatan kehumasan dan dampak sosial saat tahap likuidasi. Pengalaman berharga ini tidak hanya membentuk mentalitas kewirausahaan dan kepedulian sosial, tetapi juga memperkuat portofolio profesional saya di bidang public relations dan branding.',
      color: '#7d6cf2',
      soft: '#edeaff',
      coverImage: '/images/experience/sc.jpeg',
      coverAlt: 'Student Company',
      supportMode: 'auto',
      sponsors: [
        { image: 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fwww.instagram.com', url: 'https://www.instagram.com/flowishcompany?igsi=d2l5ejBpMW50MDd5', name: 'Flowish Company', type: 'support' },
        { image: 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fwww.instagram.com', url: 'https://www.instagram.com/scsmenda?igsi=YTAwYnE4ZDNrNXA1', name: 'SC SMENDA', type: 'support' },
      ],
      url: 'https://docs.google.com/document/d/1e5IA0dzlJRRj79UeQauLoBStNR_t69skpR8siNHfuKU/edit?usp=drive_link',
    },
    {
      id: 2,
      role: 'Game & Web Developer',
      company: 'PKL di Kisha',
      title: 'Melakukan kegiatan PKL di PT. Kisha Indonesia Buffer',
      summary: 'Selama 6 bulan menjalani program PKL di kisha.co.id, saya berkontribusi aktif dalam mengembangkan ekosistem digital mooding.id melalui pembangunan mini-game Match Card dan platform Internal Marketplace. Saya merancang logika permainan, algoritma shuffling, serta pengelolaan state kartu pada fitur Match Card untuk meningkatkan user engagement, sekaligus membangun sistem penukaran poin reward berfitur Role-Based Access Control (RBAC) pada Internal Marketplace demi memastikan keamanan dan konsistensi transaksi karyawan. Seluruh rangkaian proyek ini tidak hanya mengasah kemampuan teknis saya dalam rekayasa perangkat lunak, integrasi API, dan optimasi performa front-end, tetapi juga memberikan pemahaman mendalam tentang pentingnya menciptakan solusi digital yang solutif dan berorientasi pada pengguna.',
      color: '#4f8dff',
      soft: '#e4efff',
      coverImage: '/images/experience/kisha.jpeg',
      coverAlt: 'PKL Kisha',
      supportMode: 'auto',
      sponsors: [
        { image: 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fkisha.co.id', url: 'https://kisha.co.id/', name: 'Kisha', type: 'support' },
        { image: 'https://www.google.com/s2/favicons?sz=128&domain_url=https%3A%2F%2Fmooding.id', url: 'https://mooding.id/', name: 'Mooding', type: 'support' },
      ],
      url: 'https://docs.google.com/document/d/1rE2TDnsvxUhamWE91vqnCEap_BBrnjCQ177tdGYkDs4/edit?usp=drive_link',
    },
  ],
}
