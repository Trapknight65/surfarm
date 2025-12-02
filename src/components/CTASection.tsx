"use client";

export default function CTASection() {
    return (
        <section className="py-20 px-6 bg-bg">
            <div className="max-w-5xl mx-auto">
                <div className="neu-convex p-12 md:p-16 text-center">
                    {/* Emoji */}
                    <div className="neu-pressed w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
                        🌊
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
                        Ready to ride the wave?
                    </h2>
                    <p className="text-xl text-text/70 mb-10 max-w-2xl mx-auto">
                        Join our community and experience the perfect blend of surfing and sustainable living.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="neu-btn px-8 py-4 text-lg font-semibold bg-accent text-white hover:scale-105 transition-transform">
                            Book Your First Lesson
                        </button>
                        <button className="neu-btn px-8 py-4 text-lg font-semibold text-text hover:scale-105 transition-transform">
                            Explore Community
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
