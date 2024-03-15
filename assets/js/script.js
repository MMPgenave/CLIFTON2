// Global Variables - Consider minimizing global scope
EdistanceFromTopConvertToAdvance = 0;
EdistanceFromTopLatestPosition = '';
EsanjTemplate = document.querySelector('#ETemplate');
// After Load Pages
document.addEventListener('DOMContentLoaded', function () { // Adding an event listener for DOMContentLoaded
    // All Colors Section
// Consider using let or const instead of let for better scoping.
    let Esection_colors = {
        'greenColor': {
            'section-container': 'f6f6f6',
            'main-element': "93c6ad",
            'main-section': "56a278"
        },
        "blueColor": {
            'section-container': "f6f6f6",
            'main-element': "98C0D0",
            'main-section': "5996B1"
        }
    }

    // Color Section Static
// Consider using let or const instead of let for better scoping.
    let EclassColorStatic = {
        "ConvertToAdvance": {
            'section-container': "f6f6f6",
            'main-element': "E9CF91",
            'main-section': "DCB051"
        },
        // "contentIndex": {
        //     'section-container': "3A3A3A",
        //     'main-element': "DDDFE2",
        //     'main-section': "3A3A3A"
        // },
        // "saveInterpretation": {
        //     'section-container' : '3A3A3A',
        //     'main-element': "DDDFE2",
        //     'main-section': "3A3A3A"
        // },
    }


    // پیدا کردن اولین المان با کلاس 'tools'
    let EtoolsElement = EsanjTemplate.querySelector('#sec_1 .tools');
    if (EtoolsElement) {
        // کپی کردن کل محتوای HTML از المان 'tools'
        let EtoolsHtml = EtoolsElement.outerHTML;

        // پیدا کردن همه المان‌های '.box-main' درون '.section_container'
        let EboxMains = EsanjTemplate.querySelectorAll('.section_container > .box-main');

        // اضافه کردن محتوای 'tools' به هر '.box-main' که فاقد المان '.tools' است
        EboxMains.forEach(EboxMain => {
            if (!EboxMain.querySelector('.tools')) {
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = EtoolsHtml;
                let ToolsNode = tempDiv.firstChild;

                // افزودن نود DOM به EboxMain
                EboxMain.appendChild(ToolsNode);
            }
        });
    }

    // پیدا کردن اولین المان با کلاس 'tools'
    let EfooterElement = EsanjTemplate.querySelector('.section_container .footer');
    if (EfooterElement) {
        // کپی کردن کل محتوای HTML از المان 'tools'
        let EfooterHtml = EfooterElement.outerHTML;

        // پیدا کردن همه المان‌های '.box-main' درون '.section_container'
        let EboxMains = EsanjTemplate.querySelectorAll('.section_container > .box-main');

        // اضافه کردن محتوای 'tools' به هر '.box-main' که فاقد المان '.tools' است
        EboxMains.forEach(EboxMain => {
            if (!EboxMain.querySelector('.footer')) {
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = EfooterHtml;
                let footerNode = tempDiv.firstChild;

                // افزودن نود DOM به EboxMain
                EboxMain.appendChild(footerNode);
            }
        });
    }


    // Remove Button Next in Last Section
    let ElastSectionContainer = EsanjTemplate.querySelector('.section_container:last-child');
    if (ElastSectionContainer) {
// Consider using let or const instead of let for better scoping.
        let nextButtonFooter = ElastSectionContainer.querySelector('.footer .next-button')
        if (nextButtonFooter)
            nextButtonFooter.remove()
    }

    let EfirstSectionContainer = EsanjTemplate.querySelector('.section_container:first-child');
    if (EfirstSectionContainer) {
// Consider using let or const instead of let for better scoping.
        let PreviousButtonFooter = EfirstSectionContainer.querySelector('.footer .previous-button')
        if (PreviousButtonFooter) {
            PreviousButtonFooter.remove()
        }
    }


    // Set Color in Sections
    let ESectionContainerElements = EsanjTemplate.querySelectorAll('.section_container');
    if (ESectionContainerElements) {
        ESectionContainerElements.forEach((Esection, index) => {
            // محاسبه ایندکس رنگ بر اساس تعداد رنگ‌ها
// Consider using let or const instead of let for better scoping.
            let EcolorIndex = Object.keys(Esection_colors)[index % Object.keys(Esection_colors).length];

            Esection.classList.add(EcolorIndex)
            // اعمال رنگ به background
            EsetBodyBackground()

            Esection.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['section-container'];
            Esection.querySelector('.box-main > .header').style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section'];

// Consider using let or const instead of let for better scoping.
            let EtoolsDiv = Esection.querySelectorAll('.box-main > .tools > div');
            EtoolsDiv.forEach(function (Ediv) {
                Ediv.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section'];
            });

            if (Esection.querySelector('.section_container .footer .btnSaveInterpretation')) {
                Esection.querySelector('.section_container .footer .btnSaveInterpretation').style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section']

            }
            // اضافه کردن کلاس مربوط به رنگ

            EsetSvgColor(Esection.id, Esection_colors[EcolorIndex]['main-section'])
            SetColorInnerElementInContent(Esection_colors, EcolorIndex, Esection);


        });

        //  Set Color Static
        ESectionContainerElements.forEach((Esection, index) => {
            if (EclassColorStatic[Esection.id]) {
                // اعمال رنگ به background
                Esection.style.backgroundColor = '#' + EclassColorStatic[Esection.id]['main-element'];
                Esection.querySelector('.box-main > .header').style.backgroundColor = '#' + EclassColorStatic[Esection.id]['main-section'];

// Consider using let or const instead of let for better scoping.
                let Etoolsdiv = Esection.querySelectorAll('.box-main > .tools > div');
                Etoolsdiv.forEach(function (Ediv) {
                    Ediv.style.backgroundColor = '#' + EclassColorStatic[Esection.id]['main-section'];
                });

                EsetSvgColor(Esection.id, EclassColorStatic[Esection.id]['main-section'])

                SetColorInnerElementInContent(EclassColorStatic, Esection.id, Esection);
            }
        });
    }

    //  Lock Auto Section With contetnIndex Lock class
    let EcontentIndexLock = EsanjTemplate.querySelectorAll('.EcontentIndex  .content .lock');
    if (EcontentIndexLock) {

        EcontentIndexLock.forEach(function (element) {
            element.addEventListener('click', function () { // Adding an event listener for DOMContentLoaded
                // اینجا کد مورد نظر خود را قرار دهید
                EsanjTemplate.querySelector('.EcontentIndex  .blur-lock').classList.add('active')
            });


        });

        EcontentIndexLock.forEach(function (element) {
            let blurLockElement = EsanjTemplate.querySelector('.blur-lock').outerHTML;
            let idSectionTarget = element.getAttribute('data-sectionId')

            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = blurLockElement;
            let newElement = tempDiv.firstChild;

            let ContentSection = EsanjTemplate.querySelector('#' + idSectionTarget + ' > .box-main > .content');
            if (ContentSection) {
                ContentSection.appendChild(newElement)
            }
        });
    }

    //  Pro Auto Section With contetnIndex Pro class
    let EcontentIndexPro = EsanjTemplate.querySelectorAll('.EcontentIndex  .content .pro');
    if (EcontentIndexPro) {

        EcontentIndexPro.forEach(function (element) {
            let isProClass = element.classList.contains('pro');
            let idSectionTarget = element.getAttribute('data-sectionId')

            let ContentSection = EsanjTemplate.querySelector('#' + idSectionTarget);
            if (ContentSection) {
                ContentSection.classList.add('pro')
            }
        });
    }


    function SetColorInnerElementInContent(Esection_colors, EcolorIndex, Esection) {

        // Color Set Inner Content Tag Class Static
        // Esanj Background Dark Color
        let EbgDark = Esection.querySelectorAll('.box-main > .content  .EbgDark');
        EbgDark.forEach(function (EbgDark) {
            EbgDark.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section'];
        });

        let EbgLight = Esection.querySelectorAll('.box-main > .content  .EbgLight');
        EbgLight.forEach(function (EbgLight) {
            EbgLight.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-element'];
        });


        let EbgOpacity = Esection.querySelectorAll('.box-main > .content  .EbgOpacity');
        EbgOpacity.forEach(function (EbgOpacity) {
            EbgOpacity.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section'] + '26';
        });

        let EbgOpacityHigh = Esection.querySelectorAll('.box-main > .content  .EbgOpacityHigh');
        EbgOpacityHigh.forEach(function (EbgOpacityHigh) {
            EbgOpacityHigh.style.backgroundColor = '#' + Esection_colors[EcolorIndex]['main-section'] + '13';
        });


        let EcolorDark = Esection.querySelectorAll('.box-main > .content  .EcolorDark');
        EcolorDark.forEach(function (EcolorDark) {
            EcolorDark.style.color = '#' + Esection_colors[EcolorIndex]['main-section'];
        });

        let EcolorLight = Esection.querySelectorAll('.box-main > .content  .EcolorLight');
        EcolorLight.forEach(function (EcolorLight) {
            EcolorLight.style.color = '#' + Esection_colors[EcolorIndex]['main-element'];
        });

        let EborderDark = Esection.querySelectorAll('.box-main > .content  .EborderDark');
        EborderDark.forEach(function (EborderDark) {
            EborderDark.style.borderColor = '#' + Esection_colors[EcolorIndex]['main-section'];
        });

        let EborderLight = Esection.querySelectorAll('.box-main > .content  .EborderLight');
        EborderLight.forEach(function (EborderLight) {
            EborderLight.style.borderColor = '#' + Esection_colors[EcolorIndex]['main-element'];
        });

        let EbgBeforeDark = Esection.querySelectorAll('.box-main > .content  .EbgBeforeDark');
        EbgBeforeDark.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EbgBeforeDark::before { background-color: #' + Esection_colors[EcolorIndex]['main-section'] + ' }';
            EsaveRuleCssStyle(rule);
        });

        let EbgBeforeLight = Esection.querySelectorAll('.box-main > .content  .EbgBeforeLight');
        EbgBeforeLight.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EbgBeforeLight::before { background-color: #' + Esection_colors[EcolorIndex]['main-element'] + ' }';
            EsaveRuleCssStyle(rule);
        });
        let EbgBeforeUltralight = Esection.querySelectorAll('.box-main > .content  .EbgBeforeUltralight');
        EbgBeforeUltralight.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EbgBeforeUltralight::before { background-color: #' + Esection_colors[EcolorIndex]['main-element'] + '33' + ' }';
            EsaveRuleCssStyle(rule);
        });

        let EcolorBeforeDark = Esection.querySelectorAll('.box-main > .content  .EcolorBeforeDark');
        EcolorBeforeDark.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EcolorBeforeDark::before { color: #' + Esection_colors[EcolorIndex]['main-section'] + ' }';
            EsaveRuleCssStyle(rule);
        });

        let EcolorBeforeLight = Esection.querySelectorAll('.box-main > .content  .EcolorBeforeLight');
        EcolorBeforeLight.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EcolorBeforeLight::before { color: #' + Esection_colors[EcolorIndex]['main-element'] + ' }';
            EsaveRuleCssStyle(rule);
        });

        let EborderBeforeDark = Esection.querySelectorAll('.box-main > .content  .EborderBeforeDark');
        EborderBeforeDark.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EborderBeforeDark::before { border-color: #' + Esection_colors[EcolorIndex]['main-section'] + ' }';
            EsaveRuleCssStyle(rule);
        });

        let EborderBeforeLight = Esection.querySelectorAll('.box-main > .content  .EborderBeforeLight');
        EborderBeforeLight.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EborderBeforeLight::before { border-color: #' + Esection_colors[EcolorIndex]['main-element'] + ' }';
            EsaveRuleCssStyle(rule);
        });




        let EbgAfterDark = Esection.querySelectorAll('.box-main > .content  .EbgAfterDark');
        EbgAfterDark.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EbgAfterDark::after { background-color: #' + Esection_colors[EcolorIndex]['main-section'] + ' }';
            EsaveRuleCssStyle(rule);
        });





        let EborderAfterDark = Esection.querySelectorAll('.box-main > .content  .EborderAfterDark');
        EborderAfterDark.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EborderAfterDark::after { border-color: #' + Esection_colors[EcolorIndex]['main-section'] + ' !important }';
            EsaveRuleCssStyle(rule);
        });

        let EborderAfterLight = Esection.querySelectorAll('.box-main > .content  .EborderAfterLight');
        EborderAfterLight.forEach(function () {
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EborderAfterLight::after { border-color: #' + Esection_colors[EcolorIndex]['main-element'] + ' }';
            EsaveRuleCssStyle(rule);
        });


        let EiconBeforeDark = Esection.querySelectorAll('.box-main > .content  .EiconBeforeDark');
        EiconBeforeDark.forEach(function (EiconBeforeDark) {
            var icon = window.getComputedStyle(EiconBeforeDark, '::before').getPropertyValue('content');
            var replacedStringURL = icon.replaceAll(/%23.*?'/g, '%23' + Esection_colors[EcolorIndex]['main-section'] + "'");

            // let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EiconBeforeDark::before { content: '+replacedStringURL+';}';
            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EiconBeforeDark::before { content: ' + replacedStringURL + ' !important;}';

            EsaveRuleCssStyle(rule);
        });

        let EiconBeforeLight = Esection.querySelectorAll('.box-main > .content  .EiconBeforeLight');
        EiconBeforeLight.forEach(function (EiconBeforeLight) {
            var icon = window.getComputedStyle(EiconBeforeLight, '::before').getPropertyValue('content');
            var replacedStringURL = icon.replaceAll(/%23.*?'/g, '%23' + Esection_colors[EcolorIndex]['main-element'] + "'");

            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EiconBeforeLight::before { content: ' + replacedStringURL + ' !important;}';
            EsaveRuleCssStyle(rule);
        });

        let EiconAfterDark = Esection.querySelectorAll('.box-main > .content  .EiconAfterDark');
        EiconAfterDark.forEach(function (EiconAfterDark) {
            var icon = window.getComputedStyle(EiconAfterDark, '::after').getPropertyValue('content');
            var replacedStringURL = icon.replaceAll(/%23.*?'/g, '%23' + Esection_colors[EcolorIndex]['main-section'] + "'");

            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EiconAfterDark::after { content: ' + replacedStringURL + ' !important;}';
            EsaveRuleCssStyle(rule);
        });

        let EiconAfterLight = Esection.querySelectorAll('.box-main > .content  .EiconAfterLight');
        EiconAfterLight.forEach(function (EiconAfterLight) {
            var icon = window.getComputedStyle(EiconAfterLight, '::after').getPropertyValue('content');
            var replacedStringURL = icon.replaceAll(/%23.*?'/g, '%23' + Esection_colors[EcolorIndex]['main-element'] + "'");

            let rule = '#ETemplate .main #' + Esection.id + ' .box-main .EiconAfterLight::after { content: ' + replacedStringURL + ' !important;}';
            EsaveRuleCssStyle(rule);
        });


    }


    var textAreaComment = ETemplate.querySelector('#comments')
    if (textAreaComment) {
        textAreaComment.innerHTML = null;
    }

    EsetSocialMediaLink();
    
});

window.addEventListener('scroll', function () {
    var MenuStickyPhone = document.querySelector('.tools.E-phone');
    if (MenuStickyPhone) {
        var sticky = MenuStickyPhone.offsetTop;

        if (window.pageYOffset > sticky) {
            MenuStickyPhone.classList.add('fixed-sticky');
        } else {
            MenuStickyPhone.classList.remove('fixed-sticky');
        }
    }
});

// Set SVG header Colorize
function EsetSvgColor(classColorSection, hexColor) {


    // تعریف الگوی SVG اصلی با مقدار fill قابل جایگزین
// Consider using let or const instead of let for better scoping.
    let svgTemplate = "data:image/svg+xml,%3Csvg width='1000' height='50' viewBox='0 0 1000'  fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.3' d='M605.13 1.64553C511.93 5.06683 427.62 13.7061 343.47 22.6092C417.3 20.5389 489.26 17.317 560.14 14.1856C658.23 9.8512 759.82 5.58547 864.54 4.7552C779.76 0.0754318 691.3 -1.51863 605.13 1.64553ZM343.47 22.6092C297.69 23.8894 251.2 24.7229 203.78 24.809C133.21 24.9354 65.38 23.4253 0 20.8462V48.8682C59.88 46.9222 118.67 43.6839 174.92 39.1284C232.7 34.4497 288 28.4722 343.47 22.6092ZM864.54 4.7552C911.14 7.32771 956.62 10.8329 1000 14.993V5.97663C973.317 5.2094 945.945 4.76256 918.37 4.64407C900.422 4.57251 882.451 4.60962 864.54 4.7552Z' fill='%23REPLACE_COLOR'/%3E%3Cpath d='M0 3.43323e-05V21.9781C65.38 24.5571 133.21 26.0673 203.78 25.9409C251.2 25.8548 297.69 25.0213 343.47 23.741C427.62 14.838 511.93 6.19869 605.13 2.77739C691.3 -0.382406 779.76 1.2073 864.54 5.88707C882.451 5.74221 900.422 5.70583 918.37 5.77811C945.944 5.89589 973.317 6.342 1000 7.10849L1000 3.43323e-05L0 3.43323e-05Z' fill='%23REPLACE_COLOR'/%3E%3C/svg%3E%0A";

    // جایگزینی 'REPLACE_COLOR' با کد رنگی داده شده
// Consider using let or const instead of let for better scoping.
    let newSvg = svgTemplate.replaceAll('REPLACE_COLOR', hexColor);

// Consider using let or const instead of let for better scoping.
    let rule = '#ETemplate .main #' + classColorSection + ' .box-main .header::before { background-image: url("' + newSvg + '"); }';
    EsaveRuleCssStyle(rule)
}

//Click in Button ConvertToAdvance
function EactivateConvertToAdvance(element, is_modal = false) {

    if (is_modal) {
        EcloseModal
    }

    if (EsanjTemplate.classList.contains('classic')) {
        EsetLatestPosition(element)

// Consider using let or const instead of let for better scoping.
        let convertToAdvance = EsanjTemplate.querySelector('.section_container#ConvertToAdvance')
        if (!is_modal)
            EsetBtnBackToSectionAgo(convertToAdvance)

// Consider using let or const instead of let for better scoping.
        // let height = element.clientHeight;

        EdistanceFromTopConvertToAdvance = convertToAdvance.offsetTop;
        window.scroll(0, EdistanceFromTopConvertToAdvance)

    } else {
// Consider using let or const instead of let for better scoping.
        let main_section = element.parentElement.parentElement.parentElement
        main_section.classList.remove('active')
        EdistanceFromTopLatestPosition = main_section.id

// Consider using let or const instead of let for better scoping.
        let convertToAdvance = EsanjTemplate.querySelector('.section_container#ConvertToAdvance');
        convertToAdvance.classList.add('active')

        EsetBtnBackToSectionAgo(convertToAdvance)

    }
}

// Click for backToSection
function EonBackToSectionClick() {
    if (EsanjTemplate.classList.contains('classic')) {
        window.scroll(0, EdistanceFromTopLatestPosition)
    } else {
// Consider using let or const instead of let for better scoping.
        let sectionActive = EsanjTemplate.querySelectorAll('.section_container.active')
        sectionActive.forEach(function (elementActive) {
            elementActive.classList.remove('active')
        });

// Consider using let or const instead of let for better scoping.
        let targetElement = EsanjTemplate.querySelector('#' + EdistanceFromTopLatestPosition)
        targetElement.classList.add('active')
    }

    EremoveButtonBackToSectionAgo();
}

// Click Store Position offsetTop
function EsetLatestPosition(element) {
// Consider using let or const instead of let for better scoping.
    let rect = element.getBoundingClientRect();
// Consider using let or const instead of let for better scoping.
    let offsetTop = rect.top + window.pageYOffset;
    EdistanceFromTopLatestPosition = offsetTop - 40
}

// Set Button BackToSection in Element
function EsetBtnBackToSectionAgo(element) {

    if (EsanjTemplate.querySelector('.tools .btnBackToSectionAgo')) {
        EsanjTemplate.querySelector('.tools .btnBackToSectionAgo').remove();
    }

    // Create Element back
// Consider using let or const instead of let for better scoping.
    let elementBackToSectionAgo = document.createElement('div')
    elementBackToSectionAgo.classList.add('btnBackToSectionAgo')
    elementBackToSectionAgo.innerHTML = 'بازگشت'
    elementBackToSectionAgo.onclick = function () {
        EonBackToSectionClick(this);
    };

    element.querySelector('.tools').appendChild(elementBackToSectionAgo)
}

function EswitchToClassicMode() {
    EsanjTemplate.classList.add('classic')
    EsetBodyBackground()
}

// Next Section view
function EnextSection(element) {
// Consider using let or const instead of let for better scoping.
    let mainSection = element.parentElement.parentElement.parentElement


    while (mainSection.nextElementSibling) {
        // حرکت به المان بعدی
        nextElementElement = mainSection.nextElementSibling;
        if (nextElementElement.classList.contains('section_container') && !nextElementElement.classList.contains('modal')) {
            mainSection.classList.remove('active')
            mainSection.nextElementSibling.classList.add('active')

            if (nextElementElement.id) {
                const elementPosition = document.getElementById(nextElementElement.id).offsetTop;
                window.scrollTo(0, elementPosition - 25);
            }
            break
        }
    }

    EsetBodyBackground()
    EremoveButtonBackToSectionAgo()
}

// Previous Section view
function EpreviousSection(element) {
// Consider using let or const instead of let for better scoping.
    let mainSection = element.parentElement.parentElement.parentElement

    while (mainSection.previousElementSibling) {
        // حرکت به المان بعدی
        nextElementElement = mainSection.previousElementSibling;

        if (nextElementElement.classList.contains('section_container') && !nextElementElement.classList.contains('modal')) {
            mainSection.classList.remove('active')
            mainSection.previousElementSibling.classList.add('active')

            if (nextElementElement.id) {
                const elementPosition = document.getElementById(nextElementElement.id).offsetTop;
                window.scrollTo(0, elementPosition - 25);
            }
            break
        }
    }

    EremoveButtonBackToSectionAgo()
    EsetBodyBackground()
}

// Modal Content List
function EopenModal(elementID) {
    if (EsanjTemplate.querySelector('#' + elementID))
        EsanjTemplate.querySelector('#' + elementID).classList.add('show')
}

function EcloseModal() {
    EsanjTemplate.querySelector('.modal.show').classList.remove('show')
}

function EgoToSection(element, elementTargetID = false, event) {
    if (!element.classList.contains('lock')) {
        EcloseBlurLock();
        EcloseModal()

        if (elementTargetID == false) {
            elementTargetID = element.getAttribute('data-sectionId')
        }
// Consider using let or const instead of let for better scoping.
        let elementTarget = EsanjTemplate.querySelector('#' + elementTargetID);
        if (EsanjTemplate.classList.contains('classic')) {
            if (elementTarget) {
                elementTarget.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        } else {
            if (elementTarget) {
                EsanjTemplate.querySelector('.section_container.active').classList.remove('active')
                elementTarget.classList.add('active')
            }
        }

        EsetBodyBackground()
        EremoveButtonBackToSectionAgo()
    }

}

function EcloseBlurLock() {
    EsanjTemplate.querySelector('.EcontentIndex  .blur-lock').classList.remove('active')
    EopenModal('EcontentIndexModal')
}

function EsetBodyBackground() {
    if (EsanjTemplate.classList.contains('supportBodyColor') && !EsanjTemplate.classList.contains('classic')) {
        document.body.style.backgroundColor = EsanjTemplate.querySelector('.section_container.active').style.backgroundColor;
    } else {
        document.body.style.backgroundColor = null
    }
}

function EremoveButtonBackToSectionAgo() {
    if (EsanjTemplate.querySelector('.btnBackToSectionAgo'))
        EsanjTemplate.querySelector('.btnBackToSectionAgo').remove()
}

function EsaveRuleCssStyle(rule) {
    let styleSheetId = 'customSvgStylesheet';
// Consider using let or const instead of let for better scoping.
    let styleSheetElement = document.getElementById(styleSheetId);

    if (!styleSheetElement) {
        styleSheetElement = document.createElement('style');
        styleSheetElement.id = styleSheetId;
        document.head.appendChild(styleSheetElement);
    }

// Consider using let or const instead of let for better scoping.
    let styleSheet = styleSheetElement.sheet;

    try {
        styleSheet.insertRule(rule, styleSheet.cssRules.length);
    } catch (e) {
        console.error("Error inserting rule: ", e);
    }
}

function EcopyLinkInterpretationClipboard() {
    var copyText = document.getElementById("EinputLinkInterpretation");
    // فرض بر این است که EinputLinkInterpretation یک المنت input یا textarea است
    copyText.value = window.location.href; // استفاده از value به جای innerHTML
    navigator.clipboard.writeText(copyText.value);
    document.querySelector("#ETooltipCopyLink").innerHTML = "کپی شد";
}

function EsetSocialMediaLink() {
// Set Link Social Media
    var whatsappLink = ETemplate.querySelector(".social_media_container .whatsAppSVG");
    if (whatsappLink) whatsappLink.href = "whatsapp://send?text=" + encodeURIComponent(window.location.href);

    var twitterLink = ETemplate.querySelector(".social_media_container .twitterSVG");
    if (twitterLink) twitterLink.href = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(window.location.href);

    var facebookLink = ETemplate.querySelector(".social_media_container .facebookSVG");
    if (facebookLink) facebookLink.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href);

    var linkedInLink = ETemplate.querySelector(".social_media_container .linkedInSVG");
    if (linkedInLink) linkedInLink.href = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(window.location.href);

    var telegramLink = ETemplate.querySelector(".social_media_container .telegramSVG");
    if (telegramLink) telegramLink.href = "https://telegram.me/share/url?url=" + encodeURIComponent(window.location.href);
}

function EopenAccordion(element) {
    element.parentElement.parentElement.querySelectorAll(".accordion_container.active").forEach((activeElement) => {
        activeElement.classList.remove("active");
    });
    element.parentElement.classList.add("active");
}

function EplayPauseVideo(element) {
    var myVideo = element.querySelector("video");
    myVideo.style.height = "unset";
    myVideo.play();
    myVideo.setAttribute("controls", "");
}

// آزمون های مرتبط
function EactiverelatedTests(element) {
    element.parentElement.parentElement.querySelector("img.active").classList.remove("active");
    element.classList.add("active");
    const imageName = element.getAttribute("src")
    const linkTest = element.getAttribute("data-link")
    const context = element.getAttribute("data-context")
    const title = element.getAttribute("data-title")

    const suggestRelatedTests = element.parentElement.parentElement.querySelector("#suggestRelatedTests");
    suggestRelatedTests.style.backgroundImage = `url('${imageName}')`;
    suggestRelatedTests.parentElement.querySelector('button.doTest-btn > a').setAttribute('href', linkTest)
    suggestRelatedTests.parentElement.querySelector('.context').innerHTML = context
    suggestRelatedTests.parentElement.querySelector('.title').innerHTML = title
}

// روانشناسان همراه
function EshowAllExperts() {
    const show_all_expert_btn = ETemplate.querySelector("#show_all_expert_btn");
    if (show_all_expert_btn) {
        show_all_expert_btn.style.display = "none";
        const hideItems = ETemplate.getElementsByClassName("hideItems");
        for (let i = 0; i < hideItems.length; i++) {
            hideItems[i].style.display = "inline";
        }
    }
}

// comment - star rating
if (ETemplate.querySelectorAll("#CommentAndShareSection .comment_container .star_rating .star").length > 0) {
    function EstarClicked(element) {
        const holder = ETemplate.querySelector("#CommentAndShareSection .comment_container #EStarRating");
        var point = element.getAttribute("data-point");
        var parent = element.parentNode;
        holder.value = point;
        var activeStars = parent.querySelectorAll(".active");
        activeStars.forEach(function (activeStar) {
            activeStar.classList.remove("active");
        });

        element.classList.add("active");
    }
}


