import {describe, expect, it} from 'vitest';
import {contactEmail} from '../config/site';
import {buildMailtoHref, buildWhatsAppShareHref, contactActions} from './contactActions';

describe('contactActions utilities', () => {
    it('builds mailto links with percent-encoded query params', () => {
        expect(buildMailtoHref('Curated selection', 'Line one\nLine two')).toBe(
            `mailto:${contactEmail}?subject=Curated%20selection&body=Line%20one%0ALine%20two`,
        );
    });

    it('exposes stable contact entry points', () => {
        expect(contactActions.email).toBe(`mailto:${contactEmail}`);
        expect(buildWhatsAppShareHref('Hello Andrei')).toContain('Hello%20Andrei');
    });
});
