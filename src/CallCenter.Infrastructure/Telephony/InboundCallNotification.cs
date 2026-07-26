namespace CallCenter.Infrastructure.Telephony;

public sealed record InboundCallNotification(
    string CallId,
    string FromNumber,
    string ToNumber,
    DateTimeOffset OccurredAtUtc);
