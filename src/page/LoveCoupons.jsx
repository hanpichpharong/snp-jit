import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Ticket, Sparkles, Heart, CircleCheck } from 'lucide-react';

export default function LoveCoupons() {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      title: 'Unlimited Warm Hugs 🫂',
      desc: 'Redeemable anytime, anywhere, for as long as you need.',
      code: 'HUG-FOREVER',
      redeemed: false,
    },
    {
      id: 2,
      title: 'Boba & Sweet Treats Date 🧋',
      desc: 'Your favorite drink + snack, 100% on me, no questions asked!',
      code: 'BOBA-LOVE',
      redeemed: false,
    },
    {
      id: 3,
      title: 'You Win Any Playful Argument 👑',
      desc: 'Use this card to instantly win any friendly debate. You are always right!',
      code: 'QUEEN-RULES',
      redeemed: false,
    },
    {
      id: 4,
      title: 'Cozy Movie & Cuddle Night 🍿',
      desc: 'You choose the movie, I bring the popcorn, blankets, and forehead kisses.',
      code: 'CUDDLE-NIGHT',
      redeemed: false,
    },
    {
      id: 5,
      title: 'Late Night Venting & Listening Ear 🌙',
      desc: 'Whenever your heart is heavy, I am here to listen and hold you.',
      code: 'ALWAYS-HERE',
      redeemed: false,
    },
    {
      id: 6,
      title: 'Special Surprise Day 🎁',
      desc: 'A mystery date planned entirely for your happiness.',
      code: 'SURPRISE-ME',
      redeemed: false,
    },
  ]);

  const handleRedeem = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffd166', '#ff758f', '#06d6a0'],
    });
  };

  return (
    <div className="coupons-section animate-fade-up">
      <div className="section-header-center">
        <span className="gallery-badge">
          <Ticket size={16} />
          <span>Love Voucher Book</span>
          <Sparkles size={16} />
        </span>
        <h2 className="gallery-title">Romantic Love Coupons Just For You 🎟️</h2>
        <p className="gallery-subtitle">
          Click any coupon to redeem it in real life! Valid forever, no expiration date.
        </p>
      </div>

      <div className="coupons-grid">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`coupon-card ${coupon.redeemed ? 'is-redeemed' : ''}`}
          >
            <div className="coupon-edge left-edge"></div>
            <div className="coupon-edge right-edge"></div>
            <div className="coupon-content">
              <div className="coupon-badge">
                <Heart size={14} fill="#e63964" />
                <span>OFFICIAL LOVE PASS</span>
              </div>
              <h3 className="coupon-title">{coupon.title}</h3>
              <p className="coupon-desc">{coupon.desc}</p>
              <div className="coupon-footer">
                <span className="coupon-code">VOUCHER: {coupon.code}</span>
                <button
                  onClick={() => handleRedeem(coupon.id)}
                  disabled={coupon.redeemed}
                  className={`redeem-btn ${coupon.redeemed ? 'redeemed-btn' : ''}`}
                >
                  {coupon.redeemed ? (
                    <>
                      <CircleCheck size={16} /> <span>REDEEMED ❤️</span>
                    </>
                  ) : (
                    <span>Redeem Pass ✨</span>
                  )}
                </button>
              </div>
            </div>
            {coupon.redeemed && (
              <div className="redeemed-stamp animate-scale-up">
                <span>ACCEPTED WITH LOVE</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
