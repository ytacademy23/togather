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
        <a href="https://blog.naver.com/ytree_academy" target="_blank" rel="noopener" class="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
          <span>📗 공식 블로그 방문하기</span> &rarr;
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
