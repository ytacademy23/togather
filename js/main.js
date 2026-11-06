/**
 * YT 심리발달 아카데미 - Main JavaScript
 * 독립 법인 기업 (주식회사 나무브레인핏)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  function openMobileMenu() {
    if (mobileMenuDrawer && mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('hidden');
      setTimeout(() => {
        mobileMenuOverlay.classList.add('opacity-100');
        mobileMenuDrawer.classList.remove('translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer && mobileMenuOverlay) {
      mobileMenuDrawer.classList.add('translate-x-full');
      mobileMenuOverlay.classList.remove('opacity-100');
      setTimeout(() => {
        mobileMenuOverlay.classList.add('hidden');
      }, 300);
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Close drawer when any anchor inside mobileMenuDrawer is clicked
  if (mobileMenuDrawer) {
    mobileMenuDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // 2. Sticky Header Scroll Effect (스크롤 시 상단 메뉴 투명화)
  const header = document.querySelector('header');
  function handleHeaderScroll() {
    if (window.scrollY > 20) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }

    // Scroll to Top Button Visibility
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100');
      }
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Scroll to Top Click
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. FAQ Accordion
  const faqButtons = document.querySelectorAll('.faq-trigger');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const answer = parent.querySelector('.faq-answer');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-answer').forEach(a => {
        if (a !== answer) {
          a.classList.remove('open');
          const otherIcon = a.closest('.faq-item')?.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answer.classList.remove('open');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 4. Copy Address Utility
  const copyAddressBtns = document.querySelectorAll('.copy-address-btn');
  copyAddressBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const address = btn.getAttribute('data-address') || '경기 하남시 미사강변남로 103 4층 406,407호 (망월동, 미사랑데르 3차)';
      navigator.clipboard.writeText(address).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="text-emerald-600 font-bold">✓ 주소가 복사되었습니다</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(() => {
        alert('주소: ' + address);
      });
    });
  });

  // 5. Hero Habit Card News Slider (4가지 성장 습관 5초 자동 전환)
  const habitCardNews = document.getElementById('habitCardNews');
  if (habitCardNews) {
    const slides = habitCardNews.querySelectorAll('.habit-slide');
    const dots = habitCardNews.querySelectorAll('.card-dot');
    const pageCounter = document.getElementById('cardNewsPage');
    const prevBtn = document.getElementById('cardNewsPrev');
    const nextBtn = document.getElementById('cardNewsNext');
    const metricItems = document.querySelectorAll('.habit-metric-item');
    let currentIndex = 0;
    let slideTimer = null;

    function showSlide(index) {
      if (!slides.length) return;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      // Update Slides
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
        }
      });

      // Update Pagination Dots
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.remove('w-1.5', 'bg-white/50');
          dot.classList.add('w-5', 'bg-white');
        } else {
          dot.classList.remove('w-5', 'bg-white');
          dot.classList.add('w-1.5', 'bg-white/50');
        }
      });

      // Update Page Counter
      if (pageCounter) {
        pageCounter.textContent = currentIndex + 1;
      }

      // Sync Metric Items (Highlight active habit)
      metricItems.forEach(item => {
        const targetSlide = parseInt(item.getAttribute('data-slide') || '-1', 10);
        if (targetSlide === currentIndex) {
          item.classList.add('border-[#7D955E]', 'bg-[#EEF3E8]/70');
          item.classList.remove('bg-[#F4F3EC]', 'border-[#D8D6CC]');
        } else {
          item.classList.remove('border-[#7D955E]', 'bg-[#EEF3E8]/70');
          item.classList.add('bg-[#F4F3EC]', 'border-[#D8D6CC]');
        }
      });
    }

    function startTimer() {
      stopTimer();
      slideTimer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 5000);
    }

    function stopTimer() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(currentIndex + 1);
        startTimer();
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(dot.getAttribute('data-index') || '0', 10);
        showSlide(targetIndex);
        startTimer();
      });
    });

    metricItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetSlide = parseInt(item.getAttribute('data-slide') || '0', 10);
        showSlide(targetSlide);
        startTimer();
      });
    });

    // Pause on hover
    habitCardNews.addEventListener('mouseenter', stopTimer);
    habitCardNews.addEventListener('mouseleave', startTimer);

    // Initial Start (5 seconds interval)
    showSlide(0);
    startTimer();
  }
});

// 5. Post Article Modal Logic (for posts.html and index.html preview)
const postsData = {
  'eval-process': {
    category: '심층 상담 안내',
    title: 'YT 아카데미만의 정밀 발달 평가 및 1:1 심층 양육 상담 시스템',
    author: 'YT 심리발달 아카데미 임상연구팀',
    date: '2026.05.15',
    tag: '#정밀평가 #TCI기질검사 #다학제상담 #양육솔루션',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          "아이의 기질과 발달을 과학적으로 분석하여 최적화된 양육 로드맵을 설계합니다."
        </p>
        <p>
          YT 심리발달 아카데미는 단순한 증상 완화를 넘어, 아동의 발달 수준과 고유한 기질적 특성을 다각도로 평가하고 가정 내 실천 가능한 솔루션을 제공하는 독립 전문 발달연구소입니다.
        </p>
        <div class="bg-slate-50 border-l-4 border-emerald-600 p-4 rounded-r-xl my-4 text-sm text-slate-700">
          <strong>YT 아카데미 평가 시스템의 강점:</strong><br>
          • <strong>다면적 과학 평가:</strong> TCI 기질 및 성격검사, 주의집중력, 언어발달, 감각/행동 기능 평가를 종합적으로 실시합니다.<br>
          • <strong>전문 슈퍼비전 피드백:</strong> 국제공인 행동분석가(BCBA) 및 1급 치료사진이 함께 분석한 심층 평가 결과를 바탕으로 보호자 맞춤 양육 상담을 진행합니다.
        </div>
        <h4 class="font-bold text-slate-900 mt-6 text-base">1. 충분한 시간의 1:1 심층 상담</h4>
        <p>
          아이의 일상적인 행동 패턴, 부모와의 상호작용 방식, 기관(어린이집/유치원/학교)에서의 적응 상태를 충분한 시간을 들여 깊이 있게 경청하고 분석합니다.
        </p>
        <h4 class="font-bold text-slate-900 mt-6 text-base">2. 맞춤형 성장 로드맵 수립</h4>
        <p>
          평가 결과를 바탕으로 아이에게 꼭 필요한 1:1 개별 치료(언어, 놀이, 인지) 및 소그룹 사회성, 학교준비반 연계 방안을 설계합니다.
        </p>
      </div>
    `
  },
  'school-prep': {
    category: '학교준비반',
    title: '예비 초등을 위한 5년 차 검증 노하우, YT "학교준비반" 프로그램 안내',
    author: '조유진 책임연구원 & 학교준비반 연구팀',
    date: '2026.08.12',
    tag: '#예비초등 #학교준비반 #하남미사 #초등적응 #사회성',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          규칙이 많아지는 초등학교 입학, 아이에게는 가장 큰 첫 번째 사회적 도전입니다.
        </p>
        <p>
          어느덧 5년 차에 접어든 YT 아카데미의 [학교준비반]은 초등학교라는 새로운 환경에 첫발을 내딛는 예비 초등학생들이 교실 규칙을 배우고, 또래와 자연스럽게 어울리며 즐겁게 학교생활을 시작할 수 있도록 설계된 검증된 프로그램입니다.
        </p>
        <h4 class="font-bold text-slate-900 mt-4 text-base">YT 학교준비반의 4대 핵심 훈련:</h4>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>교실 모의수업 & 착석 유지:</strong> 40분 수업 시간 동안 바른 자세로 집중하고, 교사의 단체 지시를 정확히 듣고 수행하는 훈련</li>
          <li><strong>알림장 작성 & 자기 물건 정리:</strong> 가방 정리, 필기도구 챙기기, 쉬는 시간과 수업 시간 구분하기 등 자기관리 능력 향상</li>
          <li><strong>또래 상호작용 & 갈등 해결:</strong> 보드게임 및 모둠 활동을 통해 차례 지키기, 양보하기, 거절당했을 때 감정 다스리기 연습</li>
          <li><strong>발표력 & 의사 표현:</strong> 내 생각을 친구들 앞에서 자신 있게 말하고, 친구의 발표를 경청하는 태도 습득</li>
        </ul>
        <p class="mt-4 bg-emerald-50 p-4 rounded-xl text-emerald-900 text-sm">
          💡 <strong>매월 보호자 브리핑 & 피드백:</strong> 매 세션 후 담당 연구원의 심층 브리핑과 가정 연계 지도법을 안내하여 가정에서도 동일한 긍정적 지지가 이어지도록 돕습니다.
        </p>
      </div>
    `
  },
  'column-eye': {
    category: '전문가 칼럼',
    title: '눈치 없는 우리 아이, 비난 대신 "사회적 단서 포착 기술"을 가르쳐주세요',
    author: '김태희 슈퍼바이저 (국제공인 행동분석가 BCBA)',
    date: '2026.08.28',
    tag: '#아동사회성 #눈치없는아이 #또래관계 #BCBA #김태희칼럼',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          "선생님, 우리 아이는 악의는 없는데 친구들의 분위기를 파악하지 못해 자꾸 오해를 받아요."
        </p>
        <p>
          상담실에서 많은 부모님들이 토로하시는 고민 중 하나입니다. 친구가 불편해하는 표정을 지어도 장난을 멈추지 않거나, 조용히 해야 할 상황에서 엉뚱한 말을 불쑥 꺼내어 친구들 사이에서 외면당하는 경우가 이에 해당합니다.
        </p>
        <h4 class="font-bold text-slate-900 mt-4 text-base">눈치는 타고나는 것이 아니라 '배우는 사회적 기술'입니다.</h4>
        <p>
          우리가 흔히 '눈치'라고 부르는 것은 인지행동적으로 <strong>'사회적 단서(Social Cues)를 포착하고 맥락을 해석하는 능력'</strong>입니다. 상대방의 미세한 표정 변화, 목소리의 억양, 주변의 신체적 거리를 감지하는 감각이 아직 미숙한 아이들에게 무작정 "눈치 좀 챙겨라"라고 다그치면 아이는 자존감만 떨어지고 불안해집니다.
        </p>
        <h4 class="font-bold text-slate-900 mt-4 text-base">가정과 치료실에서의 구체적인 솔루션:</h4>
        <ol class="list-decimal pl-5 space-y-2">
          <li><strong>감정 신호 구체화하기:</strong> "친구가 지금 눈썹을 찌푸리고 팔짱을 꼈지? 이건 '나 지금 그만하고 싶어'라는 신호야."처럼 구체적인 신체 언어로 설명해 주기</li>
          <li><strong>멈춤(Pause) 신호 연습:</strong> 분위기가 고조될 때 3초간 멈추고 주변 친구들의 표정을 둘러보는 '스톱 앤 룩(Stop & Look)' 훈련</li>
          <li><strong>안전한 소그룹 환경에서의 성공 경험:</strong> 2~4명의 소그룹 사회기술학습반에서 또래의 긍정적 피드백을 반복 경험하게 하기</li>
        </ol>
      </div>
    `
  },
  'voucher-info': {
    category: '이용안내 & 소식',
    title: 'YT 아카데미 결제 및 이용안내 (하남시 지역화폐 하머니, 연말정산 안내)',
    author: 'YT 심리발달 아카데미 행정팀',
    date: '2025.11.21',
    tag: '#이용안내 #지역화폐하머니 #소득공제 #예약안내',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          아카데미 이용 시 자주 문의하시는 결제 및 이용 관련 사항을 안내해 드립니다.
        </p>
        <div class="space-y-4 my-4">
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h5 class="font-bold text-slate-900 text-base mb-1">1. 하남시 지역화폐 '하머니' 카드 결제 가능</h5>
            <p class="text-sm">
              • YT 심리발달 아카데미는 하남시 지역화폐 가맹점으로 등록되어 있어 <strong>하머니 카드 결제가 가능</strong>합니다. 월별 충전 인센티브 혜택을 활용하시면 비용 부담을 낮추실 수 있습니다.
            </p>
          </div>
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h5 class="font-bold text-slate-900 text-base mb-1">2. 연말정산 소득공제 안내</h5>
            <p class="text-sm">
              • 본 기관 결제 건은 일반 현금영수증 및 신용카드 소득공제가 정상 적용됩니다. (발행 요청 시 등록 휴대폰 번호로 즉시 발급)
            </p>
          </div>
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h5 class="font-bold text-slate-900 text-base mb-1">3. 전문 기관 운영 원칙</h5>
            <p class="text-sm">
              • 본 아카데미는 정부 발달재활바우처 기관이 아닌, 국제공인 행동분석가(BCBA) 슈퍼비전 하의 고도화된 개별화 중재와 소그룹 프로그램을 집중 운영하는 독립 전문 발달센터입니다.
            </p>
          </div>
        </div>
      </div>
    `
  },
  'temperament-guide': {
    category: '기질 & 양육 솔루션',
    title: '아이마다 타고난 바탕이 다릅니다: 기질(Temperament) 맞춤 양육 전략',
    author: 'YT 심리발달 아카데미 연구팀',
    date: '2026.09.28',
    tag: '#기질양육 #TCI검사 #양육최적화 #퍼스널양육',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          "아이의 고유한 기질적 특성을 이해할 때, 비로소 편안하고 효과적인 양육과 성장이 시작됩니다."
        </p>
        <p>
          아이를 키우다 보면 "왜 우리 아이는 다른 아이들과 다를까?", "왜 같은 훈육을 해도 우리 아이는 더 격하게 반응할까?"라는 질문을 마주하게 됩니다.
        </p>
        <p>
          모든 아이는 태어날 때부터 고유한 자극 반응 양식인 <strong>'기질'</strong>을 가지고 태어납니다. 기질은 좋고 나쁨의 문제가 아니며, 아이의 기질을 이해하고 이에 맞춘 환경과 훈육 방식을 제공할 때 아이의 잠재력이 가장 크게 발휘됩니다.
        </p>
        <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-sm">
          <strong>🌿 YT 아카데미의 기질 기반 4대 코칭 영역:</strong><br>
          • <strong>자극추구/위험회피:</strong> 새로운 상황에 대한 불안과 호기심의 균형 맞추기<br>
          • <strong>사회적 민감성:</strong> 타인의 반응에 예민한 아이를 위한 자존감 지지법<br>
          • <strong>인내력:</strong> 시작은 쉬우나 마무리가 어려운 아이의 동기 부여 전략<br>
          • <strong>자율성 코칭:</strong> 아이 스스로 선택하고 책임지는 일상 루틴 형성
        </div>
      </div>
    `
  },
  'column-anger': {
    category: '전문가 칼럼',
    title: '치료실에서 가르치는 아이의 분노 조절 3단계 기술',
    author: '김태희 슈퍼바이저 (국제공인 행동분석가 BCBA)',
    date: '2026.06.26',
    tag: '#감정조절 #분노조절 #행동치료 #ABA #김태희칼럼',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          화가 나면 물건을 던지거나 소리를 지르는 아이, 화를 내지 말라고 억눌러야 할까요?
        </p>
        <p>
          정답은 "아닙니다"입니다. 분노는 사람이라면 누구나 느끼는 자연스러운 감정입니다. 문제가 되는 것은 '분노'라는 감정이 아니라, 그것을 표현하는 <strong>'공격적이거나 파괴적인 행동 방식'</strong>입니다.
        </p>
        <h4 class="font-bold text-slate-900 mt-4 text-base">치료실에서 훈련하는 분노 조절 3단계:</h4>
        <div class="space-y-3">
          <div class="p-3 bg-slate-50 rounded-lg border-l-4 border-amber-500">
            <strong>1단계: 분노 신체 신호 알아차리기 (Body Check)</strong><br>
            가슴이 두근거리거나 주먹이 쥐어질 때 "아, 지금 내 몸에 불이 켜졌구나!" 스스로 인식하는 연습
          </div>
          <div class="p-3 bg-slate-50 rounded-lg border-l-4 border-teal-500">
            <strong>2단계: 안전한 쿨다운 전략 (Cool Down)</strong><br>
            심호흡 5회(거북이 호흡법), 벽 밀기 운동, 치료실 릴랙스 존에서 3분간 감정 가라앉히기
          </div>
          <div class="p-3 bg-slate-50 rounded-lg border-l-4 border-blue-500">
            <strong>3단계: 대체 의사소통 행동(FCT)으로 표현하기</strong><br>
            물건을 던지는 대신 "나 지금 속상해서 도움이 필요해요", "잠깐 쉴래요"라고 언어로 요청하기
          </div>
        </div>
        <p class="mt-4">
          행동과학(ABA)에서는 문제행동을 억누르는 것이 아니라, 그 행동이 전하고자 했던 욕구를 안전하고 적절한 행동으로 '대체(Replacement)'해 주는 것을 핵심으로 합니다.
        </p>
      </div>
    `
  },
  'advisory-qa': {
    category: '이용방법 & 자문의 Q&A',
    title: '[필독] 아카데미 이용 방법 & 자문의 상담 Q&A 총정리',
    author: 'YT 심리발달 아카데미 행정연구팀',
    date: '2026.03.21',
    tag: '#필독공지 #이용방법 #자문의상담 #구글폼접수 #대기순서',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 font-bold text-sm">
          ⚠️ 중요 안내: YT 아카데미는 대기 순서의 공정성을 위해 전화 신청을 받지 않으며, 오직 구글 폼 온라인 신청서로만 순차 접수됩니다.
        </div>
        <p class="font-medium text-slate-900 text-base">
          1. 신청서 접수 및 순차 대기 시스템
        </p>
        <p>
          작성해주신 구글 폼 신청서는 작성 일시 순서대로 엑셀 데이터에 자동 저장되어 누락 없이 공정하게 순차 대기열에 등록됩니다.
        </p>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <h5 class="font-bold text-slate-900 text-sm">구글 폼 신청서 3가지 선택 유형별 연락 안내:</h5>
          <div class="text-xs space-y-2">
            <p>• <strong>1번 (치료·평가 희망):</strong> 신청서가 확인되는 대로 담당자가 순차적으로 즉시 연락드립니다.</p>
            <p>• <strong>2번 (자문의 상담만 희망):</strong> 대기자가 많아 <strong>매월 첫 번째 금요일</strong> 네이버 블로그에 대기 순서를 공지해 드리며, 순번에 맞춰 전화를 드립니다.</p>
            <p>• <strong>3번 (치료·평가 우선 희망):</strong> 신청서가 확인되는 대로 담당자가 순차적으로 즉시 연락드립니다.</p>
          </div>
        </div>
        <p class="font-medium text-slate-900 text-base mt-4">
          2. 모든 아동 공통: 원장님 1:1 심층 초기상담
        </p>
        <p>
          어떤 유형으로 신청하든, 모든 아동은 <strong>이미지 원장님과의 1:1 심층 초기상담</strong>을 거쳐 아이에게 가장 적합한 개별화 치료 및 자문의 상담 솔루션을 배정받게 됩니다.
        </p>
        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-1">
          <strong>자문의 상담 4단계 루트:</strong><br>
          원장님 심층 초기상담 &rarr; 정밀 발달 평가 &rarr; 평가 결과 해석 브리핑 &rarr; 소아정신과 전문의 자문의 심층 상담
        </div>
        <div class="pt-4 text-center">
          <a href="https://forms.gle/fxMGcyj2b9ecVrq88" target="_blank" rel="noopener" class="inline-block py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition">
            📝 구글 폼 온라인 신청서 바로가기 (forms.gle) &rarr;
          </a>
        </div>
      </div>
    `
  },
  'yt-social-skills': {
    category: 'YouTube 특강',
    title: '[유튜브] 친구 사귀기 힘들어하는 아이를 위한 ABA 사회성 기술 솔루션',
    author: '연세나무아카데미 유튜브 채널',
    date: '2026.10.15',
    tag: '#유튜브특강 #사회성기술 #ABA행동치료 #또래관계 #눈치훈련',
    link: 'https://www.youtube.com/@yonseitree',
    linkText: '▶ 유튜브 @yonseitree 채널에서 시청하기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          "눈치는 성격이 아니라 과학적으로 배우는 구체적인 행동 기술입니다."
        </p>
        <p>
          연세나무아카데미 공식 유튜브 채널(@yonseitree)에서 공개한 전문가 특강 콘텐츠입니다. 또래 관계에서 의도치 않게 갈등이 생기거나, 상대방의 비언어적 신호(표정, 억양)를 읽기 어려워하는 아이들을 위한 실전 솔루션을 다룹니다.
        </p>
        <div class="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl my-4 text-sm text-rose-950">
          <strong>유튜브 핵심 강연 요약:</strong><br>
          • <strong>1단계: 사회적 단서 포착</strong> - 친구의 표정과 목소리 톤에서 상황 파악하기<br>
          • <strong>2단계: 주고받는 대화(Turn-Taking)</strong> - 내 관심사만 일방적으로 말하지 않고 질문 건네기<br>
          • <strong>3단계: 거절 대처 훈련</strong> - 친구가 거절했을 때 떼쓰거나 화내지 않고 감정 추스르기
        </div>
        <p>
          아이의 사회적 행동을 작은 단위로 나누어 가르치고, 실제 학교와 놀이 상황에서 어떻게 일반화할 수 있는지 상세한 시연과 함께 설명해 드립니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://www.youtube.com/@yonseitree" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-[#CC0000] hover:bg-[#b00000] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>연세나무아카데미 유튜브 본편 시청하기 &rarr;</span>
          </a>
        </div>
      </div>
    `
  },
  'yt-adhd-guide': {
    category: 'YouTube 특강',
    title: '[유튜브] 산만하고 충동적인 아이, 훈육 대신 필요한 행동분석(ABA) 가이드',
    author: '연세나무아카데미 유튜브 채널',
    date: '2026.09.05',
    tag: '#주의집중력 #ADHD #행동중재 #부모교육 #유튜브강의',
    link: 'https://www.youtube.com/@yonseitree',
    linkText: '▶ 유튜브 @yonseitree 채널에서 시청하기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          "가만히 있어!"라는 꾸중 대신, 집중할 수 있는 환경과 대체 행동을 가르쳐야 합니다.
        </p>
        <p>
          수업 시간에 엉덩이를 들썩이거나 과제에 몰입하지 못하는 산만한 아이, 어떻게 도와주어야 할까요? 연세나무아카데미 채널의 임상 행동분석 전문가 특강입니다.
        </p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-sm text-amber-950">
          <strong>가정에서 실천하는 3대 집중력 코칭:</strong><br>
          1. <strong>과제 시각화:</strong> 40분을 한 번에 집중시키기보다 15분 단위로 쪼개어 타이머 사용<br>
          2. <strong>자극 통제:</strong> 책상 주변 시각적·청각적 방해 요소를 최소화한 몰입존 구성<br>
          3. <strong>즉각적 긍정 강화:</strong> 5분 착석 성공 시 즉시 구체적인 언어 칭찬과 보상 제공
        </div>
        <p>
          뇌파 검사 및 주의력 종합검사를 통한 과학적 진단과 더불어 1:1 개별 인지치료에서 실제로 적용하는 행동 중재 원리를 알기 쉽게 풀어드립니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://www.youtube.com/@yonseitree" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-[#CC0000] hover:bg-[#b00000] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>유튜브 영상 보러가기 (@yonseitree) &rarr;</span>
          </a>
        </div>
      </div>
    `
  },
  'blog-school-recruit': {
    category: '공식 블로그',
    title: '[블로그] 2026 하반기 학교준비&적응반 모집 및 핵심 커리큘럼 총정리',
    author: 'YT 공식 네이버 블로그',
    date: '2026.10.28',
    tag: '#네이버블로그 #학교준비적응 #예비초등 #소그룹수업 #하남미사',
    link: 'https://blog.naver.com/ytree_academy',
    linkText: '📗 공식 블로그에서 상세 모집 요강 읽기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          실제 초등학교 교실과 동일한 모의 환경에서 입학 적응을 완벽히 준비합니다.
        </p>
        <p>
          YT 심리발달 아카데미 공식 네이버 블로그(blog.naver.com/ytree_academy)에 공지된 2026 하반기 '학교준비&적응반' 정규 모집 안내입니다.
        </p>
        <div class="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-xl my-4 text-sm text-emerald-950">
          <strong>학교준비&적응반 개요:</strong><br>
          • <strong>모집 대상:</strong> 7세 ~ 초등학생 (교실 적응 및 단체생활 훈련 필요 아동)<br>
          • <strong>진행 정원:</strong> 4~8명 소그룹 밀착 지도<br>
          • <strong>피드백:</strong> 매회기 보호자 심층 브리핑 및 가정 연계 입학 준비 가이드 제공<br>
          • <strong>수업 구성:</strong> 40분 수업 착석, 물건 정리, 알림장 쓰기, 모둠 협동 활동
        </div>
        <p>
          사전 초기상담 및 수준별 모둠 매칭을 통해 아이가 불안감 없이 학교생활에 흥미를 느끼도록 이끕니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://blog.naver.com/ytree_academy" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-[#03C75A] hover:bg-[#02b150] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <span>네이버 블로그 원문 공지 보러가기 &rarr;</span>
          </a>
        </div>
      </div>
    `
  },
  'blog-eval-system': {
    category: '공식 블로그',
    title: '[블로그] 종합심리평가(풀배터리)부터 ABA 발달평가까지: 원스톱 진단 가이드',
    author: 'YT 공식 네이버 블로그',
    date: '2026.07.10',
    tag: '#종합심리평가 #풀배터리 #뇌파검사 #언어검사 #ABA발달평가',
    link: 'https://blog.naver.com/ytree_academy',
    linkText: '📗 공식 블로그에서 평가 가이드 읽기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          정확한 진단이 올바른 성장 로드맵의 첫걸음입니다.
        </p>
        <p>
          YT 아카데미 공식 블로그에 연재된 심층 발달평가 안내입니다. 단순 지능검사를 넘어 인지, 정서, 언어, 뇌기능을 아우르는 4대 평가 영역을 알기 쉽게 정리해 드렸습니다.
        </p>
        <div class="bg-slate-50 border-l-4 border-slate-600 p-4 rounded-r-xl my-4 text-sm text-slate-800">
          <strong>4대 표준화 검사 영역:</strong><br>
          1. <strong>종합심리평가 (풀배터리):</strong> 인지 기능 및 정서·성격 심층 분석<br>
          2. <strong>주의력검사 / 뇌파 / AI 정서검사:</strong> 객관적 두뇌 기능 및 스트레스 프로파일링<br>
          3. <strong>언어검사 (기본, 난독, 화용):</strong> 조음, 어휘력, 맥락 소통 능력 진단<br>
          4. <strong>ABA 발달평가:</strong> 자조기술, 모방, 지시 따르기 등 구체적 행동 기능 측정
        </div>
        <p>
          검사 후 원장님과의 1:1 대면 결과 브리핑을 통해 가정 내 실천 훈육 팁과 아카데미 맞춤 치료 계획을 수립해 드립니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://blog.naver.com/ytree_academy" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-[#03C75A] hover:bg-[#02b150] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <span>블로그 칼럼 전체보기 &rarr;</span>
          </a>
        </div>
      </div>
    `
  },
  'insta-tour': {
    category: '인스타그램',
    title: '[인스타그램] YT 아카데미 1:1 개별치료실 & 모의 학교교실 랜선 투어',
    author: 'YT 공식 인스타그램',
    date: '2026.10.20',
    tag: '#인스타그램 #시설투어 #하남미사센터 #치료실환경 #모의교실',
    link: 'https://www.instagram.com/ytacademy_official',
    linkText: '📸 공식 인스타그램에서 사진과 릴스 둘러보기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          아이의 감각 안정과 집중을 돕는 따뜻하고 안전한 치료 환경입니다.
        </p>
        <p>
          공식 인스타그램(@ytacademy_official)에 업로드된 하남미사 본원 치료실 둘러보기 소식입니다. 아이들이 문을 열고 들어오는 순간 심리적 안정감을 느낄 수 있도록 친환경 자재와 차분한 조명으로 공간을 조성했습니다.
        </p>
        <div class="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-4 rounded-r-xl my-4 text-sm text-fuchsia-950">
          <strong>YT 아카데미 공간 포인트:</strong><br>
          • <strong>1:1 맞춤 세션실:</strong> 과도한 시각 자극을 배제하고 집중을 극대화한 구조화된 환경<br>
          • <strong>학교 모의 교실:</strong> 실제 초등 책걸상, 전자칠판, 알림장 게시대를 갖춘 교실 환경<br>
          • <strong>안전한 세이프티 가드:</strong> 모서리 보호대와 친환경 쿠션 매트 시공<br>
          • <strong>보호자 대기실:</strong> 실시간 진행 과정을 편안하게 기다릴 수 있는 쾌적한 라운지
        </div>
        <p>
          인스타그램 릴스와 피드에서 실제 공간 사진과 아이들의 활동 영상을 만나보실 수 있습니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://www.instagram.com/ytacademy_official" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>인스타그램에서 시설 둘러보기 &rarr;</span>
          </a>
        </div>
      </div>
    `
  },
  'insta-emotion-tips': {
    category: '인스타그램',
    title: '[인스타그램] 아이의 마음을 여는 "감정 단어 카드" 5분 코칭 팁',
    author: 'YT 공식 인스타그램',
    date: '2026.08.30',
    tag: '#인스타그램 #감정코칭 #놀이치료 #양육팁 #마음읽기',
    link: 'https://www.instagram.com/ytacademy_official',
    linkText: '📸 인스타그램에서 카드뉴스 확인하기',
    content: `
      <div class="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p class="font-medium text-slate-900 text-lg">
          자신의 감정에 이름을 붙일 수 있을 때 비로소 마음이 안정됩니다.
        </p>
        <p>
          공식 인스타그램에 게재된 양육 팁 카드뉴스입니다. 아이가 화가 나거나 속상할 때 "왜 그래?"라고 다그치기보다 감정을 차분히 알아차릴 수 있도록 돕는 실천 팁입니다.
        </p>
        <div class="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r-xl my-4 text-sm text-rose-950">
          <strong>하루 5분 감정 코칭 3단계:</strong><br>
          1. <strong>신체 감각 읽어주기:</strong> "가슴이 쿵쾅거리고 주먹이 꽉 쥐어졌네?"<br>
          2. <strong>구체적 감정 단어 붙여주기:</strong> 단순 '화남'이 아닌 '억울함', '서운함', '민망함' 명명하기<br>
          3. <strong>심호흡과 대안 제시:</strong> "후- 하고 숨 내쉬고, 네가 바라는 걸 말해줄래?"
        </div>
        <p>
          아이와 부모가 서로의 감정을 편안하게 나누는 따뜻한 소통을 응원합니다.
        </p>
        <div class="pt-2 text-center">
          <a href="https://www.instagram.com/ytacademy_official" target="_blank" rel="noopener" class="inline-flex items-center gap-2 py-3 px-6 bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span>인스타그램 카드뉴스 바로가기 &rarr;</span>
          </a>
        </div>
      </div>
    `
  }
};

function openPostModal(postId) {
  const post = postsData[postId];
  if (!post) return;

  const modal = document.getElementById('postDetailModal');
  const modalContent = document.getElementById('modalDynamicContent');

  if (modal && modalContent) {
    modalContent.innerHTML = `
      <div class="border-b border-slate-200 pb-4 mb-6">
        <div class="flex items-center gap-2 mb-2">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            ${post.category}
          </span>
          <span class="text-xs text-slate-400">${post.date}</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
          ${post.title}
        </h3>
        <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>작성: <strong class="text-slate-700">${post.author}</strong></span>
          <span class="text-emerald-700 font-medium">${post.tag}</span>
        </div>
      </div>
      <div class="prose max-w-none text-slate-700">
        ${post.content}
      </div>
      <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
        <a href="${post.link || 'https://blog.naver.com/ytree_academy'}" target="_blank" rel="noopener" class="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
          <span>${post.linkText || '📗 공식 블로그 방문하기'}</span> &rarr;
        </a>
        <button onclick="closePostModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition">
          닫기
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  }
}

function closePostModal() {
  const modal = document.getElementById('postDetailModal');
  if (modal) {
    modal.classList.remove('opacity-100');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 250);
    document.body.style.overflow = '';
  }
}
