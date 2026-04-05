import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {useOverlayKeyboardNavigation} from '../../hooks/useOverlayKeyboardNavigation';
import {useI18n} from '../../i18n/I18nProvider';
import {contactActions} from '../../utils/contactActions';
import {
    buildGuidedInquiryHref,
    buildInquiryBody,
    buildWhatsAppInquiryHref,
    type InquiryDraft,
} from '../../utils/inquiry';
import ImageStage from './ImageStage';

const CloseIcon = React.lazy(() => import('../../assets/icons/CloseIcon'));
const ChevronLeft = React.lazy(() => import('../../assets/icons/ChevronLeft'));
const ChevronRight = React.lazy(() => import('../../assets/icons/ChevronRight'));

export interface FullScreenOrderDetails {
    title: string;
    category?: string;
    location?: string;
    notes?: string;
    permalink?: string;
    inquiryType?: string;
}

interface FullScreenImageProps {
    handlePrevClick?: () => void;
    handleNextClick?: () => void;
    toggleFullScreen: (e?: React.MouseEvent | React.TouchEvent) => void;
    selectedImage: string;
    selectedImageAlt?: string;
    orderDetails?: FullScreenOrderDetails;
    onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
    onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const FullScreenImage: React.FC<FullScreenImageProps> = ({
                                                             handlePrevClick,
                                                             handleNextClick,
                                                             toggleFullScreen,
                                                             selectedImage,
                                                             selectedImageAlt = 'Full screen view',
                                                             orderDetails,
                                                             onTouchStart,
                                                             onTouchEnd,
                                                         }) => {
    const {copy} = useI18n();
    const [instagramPrepared, setInstagramPrepared] = useState(false);
    const handleClose = useCallback(() => {
        toggleFullScreen();
    }, [toggleFullScreen]);

    useOverlayKeyboardNavigation({
        onClose: handleClose,
        onPrev: handlePrevClick,
        onNext: handleNextClick,
    });

    useEffect(() => {
        if (!instagramPrepared) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setInstagramPrepared(false);
        }, 2200);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [instagramPrepared]);

    if (typeof document === 'undefined') {
        return null;
    }

    const showSideControls = Boolean(handlePrevClick || handleNextClick);
    const showOrderPanel = Boolean(orderDetails);

    const inquiryDraft = useMemo<InquiryDraft | null>(() => {
        if (!orderDetails) {
            return null;
        }

        return {
            inquiryType: orderDetails.inquiryType || copy.guidedInquiry.inquiryOptions.artworkAvailability.label,
            artwork: orderDetails.title,
            roomType: copy.inquiryEmail.fallbacks.stillDeciding,
            budgetRange: copy.inquiryEmail.fallbacks.openToGuidance,
            timeline: copy.inquiryEmail.fallbacks.justExploring,
            location: orderDetails.location,
            notes: orderDetails.notes || undefined,
        };
    }, [copy.guidedInquiry.inquiryOptions.artworkAvailability.label, copy.inquiryEmail.fallbacks.justExploring, copy.inquiryEmail.fallbacks.openToGuidance, copy.inquiryEmail.fallbacks.stillDeciding, orderDetails]);

    const emailHref = inquiryDraft ? buildGuidedInquiryHref(inquiryDraft, copy.inquiryEmail) : '';
    const whatsappInquiryHref = inquiryDraft ? buildWhatsAppInquiryHref(inquiryDraft, copy.inquiryEmail) : '';
    const instagramDraft = inquiryDraft ? buildInquiryBody(inquiryDraft, copy.inquiryEmail) : '';

    const handleInstagramAction = async () => {
        if (instagramDraft && navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(instagramDraft);
                setInstagramPrepared(true);
            } catch (error) {
                setInstagramPrepared(false);
            }
        }

        window.open(contactActions.instagram, '_blank', 'noopener,noreferrer');
    };

    return createPortal(
        <div
            id="full-screen-photo"
            className="fixed inset-0 z-120 bg-black/96 backdrop-blur-md transition-opacity duration-300"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen image view"
        >
            <div
                className="relative h-full w-full overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`grid min-h-full gap-4 lg:gap-6 ${showOrderPanel ? 'lg:grid-cols-[minmax(0,1fr)_22rem]' : ''}`}>
                    <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 sm:min-h-[calc(100vh-3rem)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-6">
                            <div className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/58 backdrop-blur-xl">
                                Full screen preview
                            </div>
                            <button
                                type="button"
                                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/78 backdrop-blur-xl transition-all duration-300 hover:border-white/28 hover:bg-white/12 hover:text-white"
                                onClick={handleClose}
                                aria-label="Close full screen view"
                            >
                                <CloseIcon/>
                            </button>
                        </div>

                        {showSideControls ? (
                            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-6 lg:px-8">
                                <div className="pointer-events-auto">
                                    {handlePrevClick ? (
                                        <button
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/78 backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-white/28 hover:bg-white/12 hover:text-white sm:h-12 sm:w-12"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handlePrevClick();
                                            }}
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft/>
                                        </button>
                                    ) : (
                                        <span className="block h-12 w-12"/>
                                    )}
                                </div>
                                <div className="pointer-events-auto">
                                    {handleNextClick ? (
                                        <button
                                            type="button"
                                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/6 text-white/78 backdrop-blur-xl transition-all duration-300 hover:translate-x-0.5 hover:border-white/28 hover:bg-white/12 hover:text-white sm:h-12 sm:w-12"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleNextClick();
                                            }}
                                            aria-label="Next image"
                                        >
                                            <ChevronRight/>
                                        </button>
                                    ) : (
                                        <span className="block h-12 w-12"/>
                                    )}
                                </div>
                            </div>
                        ) : null}

                        <div
                            className="flex h-full w-full items-center justify-center px-2 pb-14 pt-14 sm:px-14 sm:pb-16 sm:pt-16 lg:px-24"
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                        >
                            <ImageStage
                                loading="lazy"
                                src={selectedImage}
                                alt={selectedImageAlt}
                                presentation="balanced"
                                imgClassName="max-h-full max-w-full rounded-[1.4rem] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
                            />
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
                            <div className="max-w-[min(80rem,100%)] rounded-full border border-white/10 bg-white/4 px-4 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-white/58 backdrop-blur-xl sm:text-[11px]">
                                {selectedImageAlt}
                            </div>
                        </div>
                    </div>

                    {showOrderPanel && inquiryDraft && orderDetails ? (
                        <aside className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur-xl sm:p-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.26em] text-white/48">
                                    {copy.guidedInquiry.defaultEyebrow}
                                </p>
                                <h2 className="mt-3 font-display text-3xl text-white">
                                    {orderDetails.title}
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-white/66">
                                    {copy.guidedInquiry.defaultDescription}
                                </p>
                            </div>

                            <div className="grid gap-3">
                                {orderDetails.category ? (
                                    <div className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3">
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/44">
                                            {copy.inquiryEmail.labels.artwork}
                                        </p>
                                        <p className="mt-2 text-sm text-white/86">
                                            {orderDetails.category}
                                        </p>
                                    </div>
                                ) : null}
                                {orderDetails.location ? (
                                    <div className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3">
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/44">
                                            {copy.inquiryEmail.labels.location}
                                        </p>
                                        <p className="mt-2 text-sm text-white/86">
                                            {orderDetails.location}
                                        </p>
                                    </div>
                                ) : null}
                                <div className="rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/44">
                                        {copy.inquiryEmail.labels.notes}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-white/72">
                                        {inquiryDraft.notes || copy.guidedInquiry.assurancePoints[1]}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <a
                                    href={emailHref}
                                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.14]"
                                >
                                    {copy.bottomBar.email}
                                </a>
                                <a
                                    href={whatsappInquiryHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.14]"
                                >
                                    {copy.bottomBar.whatsapp}
                                </a>
                                <button
                                    type="button"
                                    onClick={handleInstagramAction}
                                    className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/[0.14]"
                                >
                                    {copy.bottomBar.instagram}
                                </button>
                            </div>

                            <div className="space-y-2 text-xs leading-5 text-white/48">
                                <p>
                                    {instagramPrepared ? 'Message copied. Paste it into Instagram.' : 'Instagram opens the profile and prepares your order text for pasting.'}
                                </p>
                                {orderDetails.permalink ? (
                                    <a
                                        href={orderDetails.permalink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex text-white/62 transition-colors duration-300 hover:text-white"
                                    >
                                        Open original post
                                    </a>
                                ) : null}
                            </div>
                        </aside>
                    ) : null}
                </div>
            </div>
        </div>
        ,
        document.body
    );
};

export default FullScreenImage;
