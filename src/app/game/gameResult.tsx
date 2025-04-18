import React from "react";
import { useRouter } from "next/navigation";
import { getUserMapping } from "@/lib/userIdentity";
import { useTranslations } from "next-intl";

interface GameResultProps {
    time: number;
    restart: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ time, restart }) => {
    const router = useRouter();
    const score = Math.floor(10000 / Math.max(1, time / 1000));

    const t = useTranslations();

    const saveScore = async () => {
        const user = getUserMapping();
        if (!user?.deviceId || !user?.username) {
            alert(t("result.userInfoIncomplete"));
            return;
        }

        try {
            const response = await fetch("/api/leaderboard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deviceId: user.deviceId,
                    username: user.username,
                    score: score,
                }),
            });
            if (response.ok) {
                alert(t("result.scoreSaved"));
                router.push("/leaderboard");
            } else {
                const data = await response.json();
                alert(t("result.errorSavingScore", { error: data.error }));
            }
        } catch (error) {
            console.error("Error saving score:", error);
            alert(t("result.errorSavingScore"));
        }
    };
    const formatTime = () => {
        const minutes = Math.floor((time / 60000) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const milliseconds = Math.floor((time / 10) % 100);

        return `${minutes.toString().padStart(2, "0")}:${
            seconds
                .toString()
                .padStart(2, "0")
        }.${milliseconds.toString().padStart(2, "0")}`;
    };
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{t("game.gameOver")}</h2>
            <p className="mb-2">
                {t("game.time")}:{" "}
                <span className="font-mono">{formatTime()}</span>
            </p>
            <p className="mb-6">
                {t("game.score")}: <span className="font-bold">{score}</span>
            </p>

            <div className="flex gap-4">
                <button
                    className="px-5 py-2 bg-primary text-primary-foreground rounded-md hover:bg-opacity-90"
                    onClick={restart}
                >
                    {t("game.restart")}
                </button>
                <button
                    className="px-5 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-opacity-90"
                    onClick={saveScore}
                >
                    {t("result.saveScore")}
                </button>
                <button
                    className="px-5 py-2 bg-muted text-muted-foreground rounded-md hover:bg-opacity-90"
                    onClick={() => router.push("/leaderboard")}
                >
                    {t("result.viewLeaderboard")}
                </button>
            </div>
        </div>
    );
};

export default GameResult;