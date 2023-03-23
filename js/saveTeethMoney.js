// imports
import { isSectionInViewPort, getCSSPropertyValueFromRoot } from './additional-func.js';
import ElementParallax from "./ElementParallax.js";

if (document.querySelector("[data-save-teeth-money-section]")) {
    // DOM elements
    const saveTeethMoneySection = document.querySelector("[data-save-teeth-money-section]");
    const saveTeethMoneyBg = saveTeethMoneySection.querySelector("[data-stsm-bg]");
    const saveTeethMoneyVault = saveTeethMoneySection.querySelector("[data-stsm-vault]");
    const saveTeethMoneyVaultLeftArm = saveTeethMoneySection.querySelector("[data-stsm-vault-left-arm]");
    const saveTeethMoneyVaultRightArm = saveTeethMoneySection.querySelector("[data-stsm-vault-right-arm]");
    const saveTeethMoneyToothMoneyCharacters = saveTeethMoneySection.querySelector("[data-stsm-tooth-money]");
    const saveTeethLottiePlayer = saveTeethMoneySection.querySelector("[data-save-teeth-lottie]");
    const saveMoneyLottiePlayer = saveTeethMoneySection.querySelector("[data-save-money-lottie]");

    // animating vault's arms
    const VAULTS_ARMS_OBJECTS = new Map([
        [
            "left",
            { 
                element: saveTeethMoneyVaultLeftArm, 
                animDuration: parseInt(getCSSPropertyValueFromRoot("--SAVE-TEETH-MONEY-SEC-vaults-left-arm-anim-duration")) 
            }
        ],
        [
            "right", 
            { 
                element: saveTeethMoneyVaultRightArm, 
                animDuration: parseInt(getCSSPropertyValueFromRoot("--SAVE-TEETH-MONEY-SEC-vaults-right-arm-anim-duration")) 
            }
        ],
    ]);

    function animateVaultsArm(whichArm) {
        const targetedArm = VAULTS_ARMS_OBJECTS.get(whichArm);

        targetedArm.element.classList.add("animate");
        setTimeout(() => {
            targetedArm.element.classList.remove("animate");
        }, targetedArm.animDuration);

        setTimeout(() => {
            const nextArmToBeAnimated = whichArm === "left" ? "right" : "left";
            animateVaultsArm(nextArmToBeAnimated);
        }, targetedArm.animDuration + 1000);
    }

    // lottie animations
    let sectionWasAlreadyInViewport = false;
    let currentIteration = 0;
    const lottieAnimationsSpeed = 0.9;
    const repeatLastSegmentCount = 5;
    const saveTeethLottieAnimInfo = {
        player: saveTeethLottiePlayer,
        lottieURL: "./save-teeth.lottie",
        numberOfFrames: 85,
        enlarging: { frames: [0, 38] },
        lightSliding: { frames: [38, 68] },
        flickering: { frames: [68, 85] },
        animationSpeed: 2700,
    }
    saveTeethLottieAnimInfo.enlarging.duration = calculateLottieAnimationSpeedBySegments(saveTeethLottieAnimInfo, "enlarging");
    saveTeethLottieAnimInfo.lightSliding.duration = calculateLottieAnimationSpeedBySegments(saveTeethLottieAnimInfo, "lightSliding");
    saveTeethLottieAnimInfo.flickering.duration = calculateLottieAnimationSpeedBySegments(saveTeethLottieAnimInfo, "flickering");
    const saveMoneyLottieAnimInfo = {
        player: saveMoneyLottiePlayer,
        lottieURL: "./save-money.lottie",
        numberOfFrames: 85,
        enlarging: { frames: [0, 38] },
        lightSliding: { frames: [38, 68] },
        flickering: { frames: [68, 85] },
        animationSpeed: 2700,
    }
    saveMoneyLottieAnimInfo.enlarging.duration = calculateLottieAnimationSpeedBySegments(saveMoneyLottieAnimInfo, "enlarging");
    saveMoneyLottieAnimInfo.lightSliding.duration = calculateLottieAnimationSpeedBySegments(saveMoneyLottieAnimInfo, "lightSliding");
    saveMoneyLottieAnimInfo.flickering.duration = calculateLottieAnimationSpeedBySegments(saveMoneyLottieAnimInfo, "flickering");

    function calculateLottieAnimationSpeedBySegments(animInfo, segmentName) {
        let segmentNumberOfFrames = 0;
        if (segmentName === "enlarging") {
            segmentNumberOfFrames = animInfo.enlarging.frames[1] - animInfo.enlarging.frames[0];
        } else if(segmentName === "lightSliding") {
            segmentNumberOfFrames = animInfo.lightSliding.frames[1] - animInfo.lightSliding.frames[0];
        } else if(segmentName === "flickering") {
            segmentNumberOfFrames = animInfo.flickering.frames[1] - animInfo.flickering.frames[0];
        }

        return (segmentNumberOfFrames * animInfo.animationSpeed) / animInfo.numberOfFrames;
    }

    function reloadPlayer(animInfo, thisIteration) {
        if (currentIteration > thisIteration) return;

        animInfo.player.load(animInfo.lottieURL);

        animInfo.player.addEventListener('ready', () => {
            createAnimSegment(animInfo, "enlarging", thisIteration);
            
            setTimeout(() => {
                playLightSlidingAndFlickeringSegments(animInfo, thisIteration);

                setInterval(() => {
                    playLightSlidingAndFlickeringSegments(animInfo, thisIteration);
                }, animInfo.lightSliding.duration + animInfo.flickering.duration * repeatLastSegmentCount);
            }, animInfo.enlarging.duration);
        });
    }
    
    function playLightSlidingAndFlickeringSegments(animInfo, thisIteration) {
        createAnimSegment(animInfo, "lightSliding", thisIteration);

        setTimeout(() => {
            createAnimSegment(animInfo, "flickering", thisIteration);
        }, animInfo.lightSliding.duration);
    }

    function createAnimSegment(animInfo, segmentName, thisIteration) {
        if (currentIteration > thisIteration) return;

        LottieInteractivity.create({
            player: animInfo.player.getLottie(),
            mode: 'chain',
            actions: [
                {
                    state:  segmentName === "flickering" ? 'loop' : 'autoplay',
                    frames: animInfo[segmentName].frames,
                    speed: lottieAnimationsSpeed,
                    loop: segmentName === "flickering" ? repeatLastSegmentCount : 0
                }
            ],
        });
    }

    window.addEventListener("load", handleLottieAnimation);
    window.addEventListener("scroll", handleLottieAnimation);

    function handleLottieAnimation() {
        if (isSectionInViewPort(saveTeethMoneySection) && sectionWasAlreadyInViewport === false) {
            sectionWasAlreadyInViewport = true;
            currentIteration++;
            reloadPlayer(saveTeethLottieAnimInfo, currentIteration);
            reloadPlayer(saveMoneyLottieAnimInfo, currentIteration);
            animateVaultsArm("left");
        }
        if (!isSectionInViewPort(saveTeethMoneySection)) {
            sectionWasAlreadyInViewport = false;
        }
    }

    // parallax
    const saveTeethMoneyBgParallax = new ElementParallax(saveTeethMoneySection, saveTeethMoneyBg, { scale: 1 }, 0.25, { scale: 1.08 }, 1.75);
    const saveTeethMoneyVaultParallax = new ElementParallax(saveTeethMoneySection, saveTeethMoneyVault, { scale: 1, x: -50, y: -50 }, 0.25, { scale: 1.05, x: -50, y: -50 }, 1.75);
    const saveTeethMoneyToothMoneyCharactersParallax = new ElementParallax(saveTeethMoneySection, saveTeethMoneyToothMoneyCharacters, { x: -50, y: 1.5 }, 0.25, { x: -50, y: -3 }, 1.75);

    window.addEventListener("load", handleDocumentLoading);
    window.addEventListener("scroll", handleDocumentLoading);

    function handleDocumentLoading() {
        const currentScroll = document.documentElement.scrollTop;

        saveTeethMoneyBgParallax.apply(currentScroll);
        saveTeethMoneyVaultParallax.apply(currentScroll);
        saveTeethMoneyToothMoneyCharactersParallax.apply(currentScroll);
    }
}